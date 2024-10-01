import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

enum Priority {
  Low,
  Medium,
  High,
}

interface Todo {
  id: number;
  task: string;
  description: string;
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
}

type TodoActions =
  | { type: 'loading' }
  | { type: 'todos/loaded'; payload: Todo[] }
  | { type: 'todo/loaded'; payload: Todo }
  | { type: 'todo/created'; payload: Todo }
  | { type: 'rejected'; payload: string };

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  currentTodo: {},
  priority: Priority.Low,
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
      const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'todo/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a todo...',
      });
    }
  }

  return (
    <TodoContext.Provider
      value={{ error, isLoading, todos, currentTodo, createTodo, priority }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };
