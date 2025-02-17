import { Dispatch, useCallback, useReducer } from 'react';
import { BASE_URL } from '../../util/Interfaces';
import { NotesAction } from '../notesContext/types';
import { PasswordAction } from '../passwordContext/types';
import { TodoActions } from '../todoContext/types';
import { DeletedContext } from './DeletedContext';
import { initalState, reducer } from './reducer';
import { actionTypes, DeletedProviderProps, DeletedState } from './types';

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

  const fetchDeletedItems = useCallback(async () => {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query GetDeletedItems($isDeleted: Boolean) {
            getNotes(isDeleted: $isDeleted) {
              id
                title
                body
                isDeleted
                deletedAt
                }
              getTodos(isDeleted: $isDeleted) {
                id
                title
                body
                priority
                deletedAt
                dueDate
              }
              getPasswordFields(isDeleted: $isDeleted) {
                id
                fieldname
                username
                email
                password
                isDeleted
                deletedAt
              }
            }`,
          variables: {
            isDeleted: true,
          },
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
  }, [dispatch]);

  // useEffect(function () {
  //   fetchDeletedItems();
  // }, []);

  async function restoreDeletedNotes(
    noteId: string,
    notesDispatch?: Dispatch<NotesAction>
  ) {
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
      // console.log("restoredNote", data.data.restoreNote);
      dispatch({
        type: 'deletedNote/restore',
        payload: { id: restoredNote.id },
      });
      //notify notes provider
      if (notesDispatch) {
        notesDispatch({
          type: 'note/restored',
          payload: restoredNote,
        });
      }
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring the note...',
      });
    }
  }

  async function restoreDeletedTodo(
    todoId: string,
    todoDispatch?: Dispatch<TodoActions>
  ) {
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
      dispatch({
        type: 'deletedTodo/restore',
        payload: { id: restoredTodo.id },
      });

      if (todoDispatch) {
        todoDispatch({
          type: 'todo/restored',
          payload: restoredTodo,
        });
      }
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error restoring todos...',
      });
    }
  }

  async function restoreDeletedPassword(
    passwordId: string,
    passwordDispatch?: Dispatch<PasswordAction>
  ) {
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

      if (passwordDispatch) {
        passwordDispatch({
          type: 'password/restored',
          payload: restoredPassword,
        });
      }
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
        fetchDeletedItems,
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
