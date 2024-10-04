import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import useSafeNavigate from '../hook/useSafeNavigate';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://localhost:4000/graphql';

interface Note {
  id: string;
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
  fetchNote: (id: string) => Promise<void>;
  updateNote: (updatedNote: Note) => Promise<void>;
  setCurrentNote: (note: Note | null) => void;
}

type NotesAction =
  | { type: 'loading' }
  | { type: 'notes/loaded'; payload: Note[] }
  | { type: 'note/loaded'; payload: Note }
  | { type: 'note/created'; payload: Note }
  | { type: 'note/deleted'; payload: Note }
  | { type: 'note/updated'; payload: Note }
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

    case 'note/updated':
      return {
        ...state,
        isLoading: false,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
        currentNote: action.payload,
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
  const navigate = useSafeNavigate();

  useEffect(function () {
    fetchNotes();
  }, []);

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
          query: ` query GetNotes($isDeleted: Boolean) {
          getNotes(isDeleted: $isDeleted) {
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
          variables: {
            isDeleted: false,
          },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      // console.log(data.data.getNotes);
      dispatch({ type: 'notes/loaded', payload: data.data.getNotes });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }

  async function createNote(newNote: Note) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation CreateNote($title: String!, $body: String!) {
          createNote(title: $title, body: $body) {
            id,
            title,
            body,
            updatedAt,
            user {
            id,
            email,
            username
            },
            deletedAt
          }            
        }`,
          variables: {
            title: newNote.title,
            body: newNote.body,
          },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'note/created', payload: data.data.createNote });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a new Note...',
      });
    }
  }

  async function deleteNote(id: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apollo-operation-name': 'DeleteNote',
        },
        body: JSON.stringify({
          query: `mutation DeleteNote($id: String!) {
            updateNote(id: $id, isDeleted: true, deletedAt: "${new Date().toISOString()}") {
              id
              title
              body
              isDeleted
              updatedAt
              deletedAt
              user {
                id
                username
                email
              }
            }
          }`,
          variables: { id },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      console.log('data from notes Context: ', data);

      // const updatedNote = { ...data.data.getNote, deletedAt: new Date().toISOString(), isDeleted: true };

      // fetch deletedNotes
      // const deletedRes = await fetch(`${BASE_URL}/deleted`);
      // const deleteddata = await deletedRes.json();

      //add updated note to deletednotes array
      // const updatedDeletedNotes = {
      //   ...deleteddata,
      //   notes: [...(deleteddata.notes || []), updatedNote],
      // };

      // Update the deleted note to the deleted note array
      // await fetch(`${BASE_URL}/deleted`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedDeletedNotes),
      // });

      // dispatch({ type: 'note/deleted', payload: data.updateNote });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading note...',
      });
    }
  }

  async function fetchNote(id: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetNote($id: String!) {
          getNote(id: $id) {
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
          variables: {
            id: id,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      // console.log('fetch single note from context: ', data);
      const note = data.data.getNote;
      dispatch({ type: 'note/loaded', payload: note });
      navigate(`/note/${note.id}`);
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error fetching note...',
      });
    }
  }

  async function updateNote(updatedNote: Note) {
    
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation UpdateNote($title:String!, $body: String!, $id: String!) {
            updateNote(id:$id, body:$body, title:$title) {
              id,
              title,
              body,
              isDeleted,
              deletedAt,
              user {
                email,
                username,
              }
            }
          }`,
          variables: {
            id: updatedNote.id,
            title: updatedNote.title,
            body: updatedNote.body,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      // console.log('updated Note: ', data);
      dispatch({ type: 'note/updated', payload: data.data.updateNote });
      navigate('/');
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating note...',
      });
    }
  }

  function setCurrentNote(note: Note | null) {
    dispatch({ type: 'note/loaded', payload: note });
    if (note) {
      navigate(`/note/${note.id}`);
    } else {
      navigate('/');
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
        fetchNote,
        updateNote,
        setCurrentNote,
        dispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider };
