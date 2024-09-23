import { createContext, ReactNode, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';

interface deletedPasswords {
  id: number;
  fieldname: string;
  username?: string;
  email?: string;
  password: string;
}

enum Priority {
  Low,
  Medium,
  High,
}

interface deletedTodos {
  id: number;
  task: string;
  description: string;
  dueDate: Date;
  priority: Priority;
}

interface deletedNotes {
  id: number;
  title: string;
  body: string;
  lastChecked: Date;
}

interface DeletedState {
  deletedTodos: deletedTodos[];
  deletedPasswords: deletedPasswords[];
  deletedNotes: deletedNotes[];
  currentDeletedNote: Partial<deletedNotes>;
  currentDeletedTodo: Partial<deletedTodos>;
  currentDeletedPassword: Partial<deletedPasswords>;
  isLoading: boolean;
  error: string;
}

const initalState: DeletedState = {
  deletedNotes: [],
  deletedTodos: [],
  deletedPasswords: [],
  isLoading: false,
  currentDeletedTodo: {},
  currentDeletedNote: {},
  currentDeletedPassword: {},
  error: '',
};

interface DeletedProviderProps {
  children: ReactNode;
}

interface DeletedContextType extends DeletedState {
  restoreDeletedNotes: (noteId: number) => Promise<void>;
}

type actionTypes =
  | { type: 'loading' }
  | { type: 'deletedPasswords/loaded'; payload: deletedPasswords[] }
  | { type: 'deletedPassword/loaded'; payload: deletedPasswords }
  | { type: 'deletedPassword/restore'; payload: deletedPasswords }
  | { type: 'deletedNotes/loaded'; payload: deletedNotes[] }
  | { type: 'deletedNote/loaded'; payload: deletedNotes }
  | { type: 'deletedNote/restore'; payload: deletedNotes }
  | { type: 'deletedTodos/loaded'; payload: deletedTodos[] }
  | { type: 'deletedTodo/loaded'; payload: deletedTodos }
  | { type: 'deletedTodo/restore'; payload: deletedTodos }
  | { type: 'rejected'; payload: string };

export const DeletedContext = createContext<DeletedContextType | undefined>(
  undefined
);

function reducer(state: DeletedState, action: actionTypes) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'deletedPasswords/loaded':
      return { ...state, isLoading: false, deletedPasswords: action.payload };

    case 'deletedPassword/loaded':
      return {
        ...state,
        isLoading: false,
        currentDeletedPassword: action.payload,
      };

    case 'deletedPassword/restore':
      return {
        ...state,
        isLoading: false,
        deletedPasswords: state.deletedPasswords.filter(
          (password) => password.id !== action.payload.id
        ),
      };

    case 'deletedNote/loaded':
      return { ...state, isLoading: false, currentDeletedNote: action.payload };

    case 'deletedNotes/loaded':
      return { ...state, isLoading: false, deletedNotes: action.payload };

    case 'deletedNote/restore':
      return {
        ...state,
        isLoading: false,
        deletedNotes: state.deletedNotes.filter(
          (note) => note.id !== action.payload.id
        ),
      };

    case 'deletedTodos/loaded':
      return { ...state, isLoading: false, deletedTodos: action.payload };

    case 'deletedTodo/loaded':
      return { ...state, isLoading: false, currentDeletedTodo: action.payload };

    case 'deletedTodo/restore':
      return {
        ...state,
        isLoading: false,
        deletedTodos: state.deletedTodos.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function DeletedProvider({ children }: DeletedProviderProps) {
  const [
    {
      isLoading,
      deletedNotes,
      deletedPasswords,
      deletedTodos,
      currentDeletedNote,
      currentDeletedPassword,
      currentDeletedTodo,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  useEffect(function () {
    async function fetchDeletedItems() {
      try {
        const res = await fetch(`${BASE_URL}/deleted`);
        const data = await res.json();

        if (data && data.notes) {
          dispatch({ type: 'deletedNotes/loaded', payload: data.notes });
        }

        if (data && data.passwords) {
          dispatch({
            type: 'deletedPasswords/loaded',
            payload: data.passwords,
          });
        }

        if (data && data.todos) {
          dispatch({ type: 'deletedTodos/loaded', payload: data.todos });
        }
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }
    fetchDeletedItems();
  }, []);

  async function restoreDeletedNotes(noteId: number) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/deleted`);
      const data = await res.json();
      const note = data.notes.find((note) => {
        return note.id === noteId;
      });

      await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      dispatch({ type: 'deletedNote/restore', payload: note });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring data...',
      });
    }
  }

  return (
    <DeletedContext.Provider
      value={{
        isLoading,
        deletedNotes,
        deletedPasswords,
        deletedTodos,
        error,
        restoreDeletedNotes,
        currentDeletedNote,
        currentDeletedPassword,
        currentDeletedTodo,
      }}
    >
      {children}
    </DeletedContext.Provider>
  );
}

export { DeletedProvider };
