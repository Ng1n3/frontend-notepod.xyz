import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:4000/graphql';

interface deletedPasswords {
  id: string;
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
  id: string;
  title: string;
  body: string;
  dueDate: Date;
  priority: Priority;
}

interface deletedNotes {
  id: string;
  title: string;
  body: string;
  deletedAt: Date;
}

interface DeletedState {
  deletedTodos: deletedTodos[];
  deletedPasswords: deletedPasswords[];
  deletedNotes: deletedNotes[];
  currentDeletedNote: Partial<deletedNotes> | null;
  currentDeletedTodo: Partial<deletedTodos> | null;
  currentDeletedPassword: Partial<deletedPasswords> | null;
  isLoading: boolean;
  error: string;
}

const initalState: DeletedState = {
  deletedNotes: [],
  deletedTodos: [],
  deletedPasswords: [],
  isLoading: false,
  currentDeletedTodo: null,
  currentDeletedNote: null,
  currentDeletedPassword: null,
  error: '',
};

interface DeletedProviderProps {
  children: ReactNode;
}

interface DeletedContextType extends DeletedState {
  restoreDeletedNotes: (noteId: string) => Promise<void>;
  restoreDeletedTodo: (todoId: string) => Promise<void>;
  restoreDeletedPassword: (passwordId: string) => Promise<void>;
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
  | { type: 'deletedTodo/loaded'; payload: deletedTodos }
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
      return {
        ...state,
        isLoading: false,
        deletedPasswords: action.payload.passwords,
      };

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
      return {
        ...state,
        isLoading: false,
        deletedNotes: action.payload.notes || [],
      };

    case 'deletedNote/restore':
      return {
        ...state,
        isLoading: false,
        deletedNotes: state.deletedNotes.filter(
          (note) => note.id !== action.payload.id
        ),
      };

    case 'deletedTodos/loaded':
      return {
        ...state,
        isLoading: false,
        deletedTodos: action.payload.todos || action.payload,
      };

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
  ] = useReducer<(state: DeletedState, action: actionTypes) => DeletedState>(
    reducer,
    initalState
  );

  async function fetchDeletedItems() {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
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
              getPasswordFields(isDeleted: true) {
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

      if (data && data.data.getNotes) {
        dispatch({
          type: 'deletedNotes/loaded',
          payload: { notes: data.data.getNotes },
        });
      }

      if (data && data.data.getPasswordFields) {
        dispatch({
          type: 'deletedPasswords/loaded',
          payload: { passwords: data.data.getPasswordFields },
        });
      }

      if (data && data.data.getTodos) {
        dispatch({
          type: 'deletedTodos/loaded',
          payload: { todos: data.data.getTodos },
        });
      }
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }

  useEffect(function () {
    fetchDeletedItems();
  }, []);

  async function restoreDeletedNotes(noteId: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation RestoreNote($id: String!) {
          restoreNote(id: $id isDeleted: false deletedAt: null) {
            id
            title
            body
            isDeleted
            deletedAt
            updatedAt
            user {
                email
                username
            }
          }
        }`,
          variables: {
            id: noteId,
          },
        }),
      });
      const data = await res.json();
      const restoredNote = data.data.restoreNote;
      // console.log("restoredNote", data);
      dispatch({ type: 'deletedNote/restore', payload: restoredNote });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring data...',
      });
    }
  }

  async function restoreDeletedTodo(todoId: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation RestoreTodo($id: String!) {
          restoreTodo(id: $id isDeleted: false deletedAt: null) {
            id
            title
            body
            isDeleted
            deletedAt
            updatedAt
            user {
                email
                username
            }
          }
        }`,
          variables: {
            id: todoId,
          },
        }),
      });
      const data = await res.json();
      const restoredTodo = data.data.restoreTodo;
      // console.log("restoredTodo", data);
      dispatch({ type: 'deletedTodo/restore', payload: restoredTodo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring todos...',
      });
    }
  }

  async function restoreDeletedPassword(passwordId: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation RestorePassword($id: String!) {
            restorePassword(id: $id isDeleted: false deletedAt: null) {
              id
              fieldname
              email
              isDeleted
              password
              username
              deletedAt
              updatedAt
              user {
                email
                username
                }
                }
                }`,
          variables: {
            id: passwordId,
          },
        }),
      });
      const data = await res.json();
      const restoredPassword = data.data.restorePassword;
      dispatch({ type: 'deletedPassword/restore', payload: restoredPassword });
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
        restoreDeletedTodo,
        restoreDeletedPassword,
        currentDeletedPassword,
        currentDeletedTodo,
      }}
    >
      {children}
    </DeletedContext.Provider>
  );
}

export { DeletedProvider };
