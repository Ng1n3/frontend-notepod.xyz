import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://localhost:4000/graphql';

interface Note {
  id: number;
  title: string;
  body: string;
  lastUpdated: Date;
  userId: string;
  deletedAt: Date;
}

interface NoteState {
  notes: Note[];
  isLoading: boolean;
  currentNote: Partial<Note>;
  error: string;
}

interface NotesProvideProps {
  children: ReactNode;
}

interface NotesContextType extends NoteState {
  createNote: (newNote: Note) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  dispatch: Dispatch<NotesAction>;
}

type NotesAction =
  | { type: 'loading' }
  | { type: 'notes/loaded'; payload: Note[] }
  | { type: 'note/loaded'; payload: Note }
  | { type: 'note/created'; payload: Note }
  | { type: 'note/deleted'; payload: Note }
  | { type: 'rejected'; payload: string };

const initalState: NoteState = {
  notes: [],
  isLoading: false,
  currentNote: {},
  error: '',
};

function reducer(state: NoteState, action: NotesAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'notes/loaded':
      return { ...state, isLoading: false, notes: action.payload };

    case 'note/loaded':
      return { ...state, isLoading: false, currentNote: action.payload };

    case 'note/created':
      return {
        ...state,
        isLoading: false,
        notes: [...state.notes, action.payload],
        currentNote: action.payload,
      };

    case 'note/deleted':
      return {
        ...state,
        isLoading: false,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
        currentNote:
          state.currentNote?.id === action.payload.id
            ? null
            : state.currentNote,
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

function NotesProvider({ children }: NotesProvideProps) {
  const [{ notes, isLoading, error, currentNote }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(function () {
    async function fetchNotes() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-apollo-operation-name': 'GetNotes',
          },
          body: JSON.stringify({
            query: ` query GetNotes {
            getNotes {
            id,
            title,
            body,
            updatedAt,
            user {
            email,
            username
            },
            deletedAt
            }
            }`,
          }),
        });
        const data = await res.json();
        // console.log('data', data);
        dispatch({ type: 'notes/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }
    fetchNotes();
  }, []);

  async function createNote(newNote: Note) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'note/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a new Note...',
      });
    }
  }

  async function deleteNote(id: number) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`);
      const data = await res.json();

      const updateNote = { ...data, deletedAt: new Date().toISOString() };

      //fetch deletedNotes
      const deletedRes = await fetch(`${BASE_URL}/deleted`);
      const deleteddata = await deletedRes.json();

      //add updated note to deletednotes array
      const updatedDeletedNotes = {
        ...deleteddata,
        notes: [...(deleteddata.notes || []), updateNote],
      };

      //Update the deleted note to the deleted note array
      await fetch(`${BASE_URL}/deleted`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDeletedNotes),
      });
      dispatch({ type: 'note/deleted', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading note...',
      });
    }
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        error,
        createNote,
        currentNote,
        deleteNote,
        dispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider };
