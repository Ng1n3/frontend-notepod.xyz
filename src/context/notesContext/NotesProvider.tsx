import { useCallback, useReducer } from "react";
import { Note, NotesAction, NotesProvideProps, NoteState } from "./types";
import useSafeNavigate from "../../hook/useSafeNavigate";
import { BASE_URL } from "../../util/Interfaces";
import { NotesContext } from "./NotesContext";
import { initalState, reducer } from "./reducer";

function NotesProvider({ children }: NotesProvideProps) {
  const [{ notes, isLoading, error, currentNote }, dispatch] = useReducer<
    (state: NoteState, action: NotesAction) => NoteState
  >(reducer, initalState);
  const navigate = useSafeNavigate();

  const fetchNotes = useCallback(async () => {
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
  }, [dispatch]);

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
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'note/created', payload: data.data.createNote });
      clearCurrentNote();
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a new Note...',
      });
    }
  }

  async function restoreNoteFromDeleted(restoreNote: Note) {
    dispatch({ type: 'loading' });
    try {
      dispatch({ type: 'note/restored', payload: restoreNote });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring a note...',
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
    async (id: string, shouldNaviage: boolean = false) => {
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

        if (shouldNaviage) {
          navigate(`/notes/${note.id}`);
        }
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
        payload: 'Something went wrong while trying to update...',
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

  // function handleApiError(error) {
  //   dispatch({
  //     type: 'rejected',
  //     payload: error.message || 'Something went wrong...',
  //   });
  // }
  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        error,
        createNote,
        currentNote,
        deleteNote,
        restoreNoteFromDeleted,
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