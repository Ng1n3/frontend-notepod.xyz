import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import useSafeNavigate from '../hook/useSafeNavigate';
import { BASE_URL } from '../util/Interfaces';

export interface Note {
  id?: string;
  title: string;
  body: string;
  updatedAt?: Date;
  userId: string;
  // deletedAt: Date;
}

interface NoteState {
  notes: Note[];
  isLoading: boolean;
  currentNote: Partial<Note> | null;
  error: string;
}

interface NotesProvideProps {
  children: ReactNode;
}

interface NotesContextType extends NoteState {
  createNote: (newNote: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes:  () => Promise<void>;
  dispatch: Dispatch<NotesAction>;
  fetchNote: (id: string) => Promise<void>;
  updateNote: (updatedNote: Note) => Promise<void>;
  setCurrentNote: (note: Note | null) => void;
  clearCurrentNote: () => void;
}

type NotesAction =
  | { type: 'loading' }
  | { type: 'notes/loaded'; payload: Note[] }
  | { type: 'note/loaded'; payload: Note }
  | { type: 'note/created'; payload: Note }
  | { type: 'note/deleted'; payload: Note }
  | { type: 'note/cleared' }
  | { type: 'note/updated'; payload: Note }
  | { type: 'rejected'; payload: string };

const initalState: NoteState = {
  notes: [],
  isLoading: false,
  currentNote: null,
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

    case 'note/cleared':
      return { ...state, isLoading: false, currentNote: null };

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
  const [{ notes, isLoading, error, currentNote }, dispatch] = useReducer<
    (state: NoteState, action: NotesAction) => NoteState
  >(reducer, initalState);
  const navigate = useSafeNavigate();

  useEffect(function () {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apollo-operation-name': 'GetNotes',
        },
        credentials: 'include',
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
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
      // console.log('data from create note', data);
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'note/created', payload: data.data.createNote });
      clearCurrentNote();
      // navigate('/notes')
      // setCurrentNote(null)
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
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apollo-operation-name': 'DeleteNote',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `mutation SoftDeleteNote($id: String!) {
          softDeleteNote(id: $id) {
              id
              title
              body
              isDeleted
              deletedAt
              updatedAt
              user{
                  email
                  username
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
      const deletedNote = data.data.softDeleteNote;
      dispatch({ type: 'note/deleted', payload: deletedNote });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading note...',
      });
    }
  }

  const fetchNote = useCallback(
    async (id: string) => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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
        const note = data.data.getNote;
        dispatch({ type: 'note/loaded', payload: note });
        navigate(`/notes/${note.id}`);
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error fetching note...',
        });
      }
    },
    [dispatch, navigate]
  );

  async function updateNote(updatedNote: Note) {
    console.log("Hi, what's live?");
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `mutation UpdateNote($title:String!, $body: String!, $id: String!) {
            updateNote(id:$id, body:$body, title:$title) {
              id,
              title,
              body,
              updatedAt,
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
      console.log('updated data', data);
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'note/updated', payload: data.data.updateNote });
      clearCurrentNote();
      navigate('/notes');
      dispatch({ type: 'note/cleared' });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating note...',
      });
    }
  }

  function setCurrentNote(note: Note | null) {
    if (note) {
      dispatch({ type: 'note/loaded', payload: note });
      navigate(`/notes/${note.id}`);
    } else {
      dispatch({ type: 'note/cleared' });
      navigate('/notes');
    }
  }

  const clearCurrentNote = useCallback(() => {
    dispatch({ type: 'note/cleared' });
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        error,
        createNote,
        currentNote,
        deleteNote,
        clearCurrentNote,
        fetchNote,
        updateNote,
        setCurrentNote,
        fetchNotes,
        dispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider };
