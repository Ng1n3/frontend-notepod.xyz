import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:4000/graphql';

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
  title: string;
  body: string;
  dueDate: Date;
  priority: Priority;
}

interface deletedNotes {
  id: number;
  title: string;
  body: string;
  deletedAt: Date;
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
  | {
      type: 'deletedPasswords/loaded';
      payload: { passwords: deletedPasswords[] };
    }
  | { type: 'deletedPassword/loaded'; payload: deletedPasswords }
  | { type: 'deletedPassword/restore'; payload: { id: string } }
  | { type: 'deletedNotes/loaded'; payload: { notes: deletedNotes[] } }
  | { type: 'deletedNote/loaded'; payload: deletedNotes }
  | { type: 'deletedNote/restore'; payload: { id: string } }
  | {
      type: 'deletedTodos/loaded';
      payload: { todos: deletedTodos[] };
    }
  | { type: 'deletedTodo/restore'; payload: { id: string } }
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
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query {
              getNotes(isDeleted: true) {
                id
                title
                body
                isDeleted
                deletedAt
              }
              getTodos(isDeleted: true) {
                id
                title
                body
                priority
                deletedAt
                dueDate
              }
              getPasswordField(isDeleted: true) {
                id
                fieldname
                username
                email
                password
                isDeleted
                deletedAt
              }
            }`,
          }),
        });
        const data = await res.json();
        // console.log('data from deletedContext: ', data);
        // dispatch({ type: 'deletedNotes/loaded', payload: data.getNotes });

        if (data && data.data.getNotes) {
          dispatch({
            type: 'deletedNotes/loaded',
            payload: data.data.getNotes,
          });
        }

        if (data && data.data.getPasswordField) {
          dispatch({
            type: 'deletedPasswords/loaded',
            payload: data.data.getPasswordField,
          });
        }

        if (data && data.data.getTodos) {
          dispatch({ type: 'deletedTodos/loaded', payload: data.data.getTodos });
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

      const updatedDeletedNote = data.notes.filter(
        (note) => note.id !== noteId
      );
      const newRes = await fetch(`${BASE_URL}/deleted`);
      const newData = await newRes.json();
      console.log('newData: ', newData);
      console.log('newly Updated Deleted note: ', updatedDeletedNote);

      // dispatch({ type: 'deletedNote/restore', payload: note });
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
