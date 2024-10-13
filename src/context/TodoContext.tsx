import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import useSafeNavigate from '../hook/useSafeNavigate';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Todo {
  id?: string;
  title: string;
  body: string;
  dueDate: Date;
  priority: Priority;
}

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  currentTodo: Partial<Todo>;
  priority: Priority;
  error: string;
}

interface TodoProviderProps {
  children: ReactNode;
}

interface TodoContextType extends TodoState {
  createTodo: (newTodo: Todo) => Promise<void>;
  fetchTodo: (id: string) => Promise<void>;
  setCurrentTodo: (todo: Todo | null) => void;
  updateTodo: (update: Todo) => Promise<void>;
  clearCurrentTodo: () => void;
  deleteTodo: (id: string) => Promise<void>;
}

type TodoActions =
  | { type: 'loading' }
  | { type: 'todos/loaded'; payload: Todo[] }
  | { type: 'todo/loaded'; payload: Todo }
  | { type: 'todo/created'; payload: Todo }
  | { type: 'todo/cleared' }
  | { type: 'todo/updated'; payload: Todo }
  | { type: 'todo/deleted'; payload: Todo }
  | { type: 'rejected'; payload: string };

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  currentTodo: {},
  priority: Priority.LOW,
  error: '',
};

function reducer(state: TodoState, action: TodoActions) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'todos/loaded':
      return { ...state, isLoading: false, todos: action.payload };

    case 'todo/loaded':
      return { ...state, isLoading: false, currentTodo: action.payload };

    case 'todo/created':
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload],
        currentTodo: action.payload,
      };

    case 'todo/updated':
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        currentTodo: action.payload,
      };

    case 'todo/deleted':
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        currentTodo:
          state.currentTodo?.id === action.payload.id
            ? null
            : state.currentTodo,
      };

    case 'todo/cleared':
      return {
        ...state,
        isLoading: false,
        currentTodo: null,
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

function TodoProvider({ children }: TodoProviderProps) {
  const [{ todos, error, currentTodo, isLoading, priority }, dispatch] =
    useReducer(reducer, initialState);

  const navigate = useSafeNavigate();

  useEffect(function () {
    async function fetchTodos() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query GetTodos($isDeleted: Boolean) {
                getTodos(isDeleted: $isDeleted) {
                  id,
                  title,
                  body,
                  updatedAt,
                  priority,
                  dueDate,
                  user {
                    id,
                    email,
                    username
                  },
                  deletedAt
                  }
                }`,
            variables: {
              isDeleted: false,
            },
          }),
        });
        const data = await res.json();
        // console.log('data from todoContext: ', data.data.getTodos);
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }
        dispatch({ type: 'todos/loaded', payload: data.data.getTodos });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }
    fetchTodos();
  }, []);

  async function createTodo(newTodo: Todo) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation CreateTodo($title: String! $body: String! $priority: String!, $dueDate: String!) {
            createTodo(title: $title, body: $body, priority: $priority, dueDate: $dueDate) {
              id,
              title,
              body,
              dueDate,
              priority,
              deletedAt,
              isDeleted
              user {
                email
                username
                }
            }
          }`,
          variables: {
            title: newTodo.title,
            body: newTodo.body,
            priority: newTodo.priority,
            dueDate: newTodo.dueDate,
          },
        }),
      });
      const data = await res.json();
      dispatch({ type: 'todo/created', payload: data.data.createTodo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a todo...',
      });
    }
  }

  async function deleteTodo(todoId: string) {
    dispatch({ type: 'loading' });
    // console.log("todoId", todoId);
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation SoftDeleteTodo($id: String!) {
            softDeleteTodo(id: $id) {
                id
                title
                body
                dueDate
                priority
                isDeleted
                deletedAt
                updatedAt
                user{
                    email
                    username
                }
            }
        }`,
          variables: { id: todoId },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const deletedTodo = data.data.softDeleteTodo;
      dispatch({ type: 'todo/deleted', payload: deletedTodo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting a todo...',
      });
    }
  }

  async function fetchTodo(id: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetNote($id: String!) {
            getTodo(id: $id) {
              id
              title
              body
              priority
              dueDate
              isDeleted
              deletedAt
              user {
                  id
                  username
                  email
              }
            }
          }`,
          variables: {
            id,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      // console.log('fetch single note from context: ', data);
      const todo = data.data.getTodo;
      dispatch({ type: 'todo/loaded', payload: todo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error fetching todo...',
      });
    }
  }

  function setCurrentTodo(todo: Todo | null) {
    if (todo) {
      dispatch({ type: 'todo/loaded', payload: todo });
      navigate(`/todos/${todo.id}`);
    } else {
      dispatch({ type: 'todo/loaded', payload: null });
      navigate('/todos');
    }
  }

  async function updateTodo(updatedTodo: Todo) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation updateTodo($title: String, $body: String, $isDeleted: Boolean, $deletedAt: String, $dueDate: String, $priority: String, $id: String!) {
          updateTodo(title: $title, body: $body, isDeleted: $isDeleted, deletedAt: $deletedAt, dueDate: $dueDate, priority: $priority, id: $id) {
            id
            title
            body
            isDeleted
            dueDate
            priority
            deletedAt
            user {
                id
                email
                username
            }
          }
          }`,
          variables: {
            id: updatedTodo.id,
            title: updatedTodo.title,
            body: updatedTodo.body,
            priority: updatedTodo.priority,
            dueDate: updatedTodo.dueDate,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const todo = data.data.updateTodo;
      dispatch({ type: 'todo/updated', payload: todo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating Todo...',
      });
    }
  }

  const clearCurrentTodo = useCallback(async function () {
    dispatch({ type: 'todo/cleared' });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        error,
        clearCurrentTodo,
        isLoading,
        todos,
        currentTodo,
        setCurrentTodo,
        createTodo,
        deleteTodo,
        updateTodo,
        priority,
        fetchTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };
