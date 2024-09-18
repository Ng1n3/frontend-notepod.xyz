import { createContext, ReactNode, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';

interface Note {
  id: number;
  title: string;
  body: string;
  lastChecked: Date;
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
}

type NotesAction =
  | { type: 'loading' }
  | { type: 'notes/loaded'; payload: Note[] }
  | { type: 'note/loaded'; payload: Note }
  | { type: 'note/created'; payload: Note }
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
      return { ...state, isLoading: false, CurrentNote: action.payload };

    case 'note/created':
      return {
        ...state,
        isLoading: false,
        notes: [...state.notes, action.payload],
        CurrentNote: action.payload,
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
        const res = await fetch(`${BASE_URL}/notes`);
        const data = await res.json();
        // const parsedData = data.map((note: Note) => ({
        //   ...note,
        //   lastChecked: new Date(note.lastChecked.split('/').reverse().join('-')),
        // }));
        dispatch({ type: 'notes/loaded', payload: data });
        // console.log('data: ', data);
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
      // dispatch({type: 'note/created', payload: data})
      console.log('created note: ', data);
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a new Note...',
      });
    }
  }

  return (
    <NotesContext.Provider
      value={{ notes, isLoading, error, createNote, currentNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider };
