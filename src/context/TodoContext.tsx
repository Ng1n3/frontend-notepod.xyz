import { createContext, ReactNode, useEffect, useReducer } from 'react';
import useSafeNavigate from '../hook/useSafeNavigate';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

interface Todo {
  id: string;
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
}

type TodoActions =
  | { type: 'loading' }
  | { type: 'todos/loaded'; payload: Todo[] }
  | { type: 'todo/loaded'; payload: Todo }
  | { type: 'todo/created'; payload: Todo }
  | { type: 'todo/updated'; payload: Todo }
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
        currentTodo: action.payload
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
      console.log('newly created todo: ', data);
      dispatch({ type: 'todo/created', payload: data.data.createTodo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a todo...',
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
    dispatch({ type: 'todo/loaded', payload: todo });
    if (todo) {
      navigate(`/todo/${todo.id}`);
      // console.log('a new current todo has been set');
    } else {
      // console.log("here the current todo is null.");
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
  return (
    <TodoContext.Provider
      value={{
        error,
        isLoading,
        todos,
        currentTodo,
        setCurrentTodo,
        createTodo,
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
