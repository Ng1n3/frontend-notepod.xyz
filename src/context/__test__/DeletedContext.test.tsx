import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import useDeleted from '../../hook/useDeleted';
import useNotes from '../../hook/useNotes';
import { DeletedProvider } from '../DeletedContext';
import { NotesProvider } from '../NotesContext';
import useTodos from '../../hook/useTodos';
import { TodoProvider } from '../TodoContext';

const TestDeletedContext = () => {
  const { isLoading, deletedNotes, deletedPasswords, deletedTodos } =
    useDeleted();

  return (
    <>
      <div data-testid="note-length">{deletedNotes.length}</div>;
      <div data-testid="password-length">{deletedPasswords.length}</div>;
      <div data-testid="todos-length">{deletedTodos.length}</div>;
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

describe('Deleted context initial state', () => {
  it('should give an array of all deletedItems', async () => {
    render(
      <MemoryRouter>
        <DeletedProvider>
          <TestDeletedContext />
        </DeletedProvider>
      </MemoryRouter>
    );
    await waitFor(
      () => {
        const loadingState = screen.getByTestId('loading-state');
        expect(loadingState.textContent).toBe('loaded');
      },
      { timeout: 5000 }
    );

    const noteLength = screen.getByTestId('note-length');
    expect(Number(noteLength.textContent)).toBe(2);

    const passwordLength = screen.getByTestId('password-length');
    expect(Number(passwordLength.textContent)).toBe(1);
    const todosLength = screen.getByTestId('todos-length');
    expect(Number(todosLength.textContent)).toBe(1);
  });
});

const TestRestoreContext = ({ id }: { id: string }) => {
  const {
    isLoading,
    restoreDeletedNotes,
    deletedNotes,
    error,
  } = useDeleted();
  const { notes, dispatch: notesDispatch } = useNotes();

  return (
    <>
      <button
        data-testid="restore-note-button"
        onClick={() => restoreDeletedNotes(id, notesDispatch)}
      >
        Restore Button
      </button>
      <div data-testid="deletedNote-length">{deletedNotes.length}</div>
      <div data-testid="note-length">{notes.length}</div>
      <div data-testid="restored-note-error">{error}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

const TestRestoreTodoContext = ({id}: {id: string}) => {
  const {isLoading, restoreDeletedTodo, deletedTodos, error} = useDeleted()
  const {todos, dispatch: todoDispatch} = useTodos()

  return (
    <>
      <button
        data-testid="restore-todo-button"
        onClick={() => restoreDeletedTodo(id, todoDispatch)}
      >
        Restore Button
      </button>
      <div data-testid="deletedTodo-length">{deletedTodos.length}</div>
      <div data-testid="todo-length">{todos.length}</div>
      <div data-testid="restored-todo-error">{error}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
}

describe('restoring a deleted Items', () => {
  it('should restore a deleted note via the id', async () => {
    const id = 'BIdqeEi8Gx';
    render(
      <MemoryRouter>
        <DeletedProvider>
          <NotesProvider>
            <TestRestoreContext id={id} />
          </NotesProvider>
        </DeletedProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const restoreButton = screen.getByTestId('restore-note-button');
      await userEvent.click(restoreButton);
    });

    await waitFor(() => {
      const deletedNotelength = screen.getByTestId('deletedNote-length');
      const noteLength = screen.getByTestId('note-length');
      const error = screen.getByTestId('restored-note-error');
      const loadingState = screen.getByTestId('loading-state');

      expect(Number(deletedNotelength.textContent)).toBe(1);
      expect(Number(noteLength.textContent)).toBe(3);
      expect(error.textContent).toBe('');
      expect(loadingState.textContent).toBe('loaded');
    });
  });

  it('should restore a deleted to via the id', async () => {
    const id = 'cx3iPLO67z'
    render(
      <MemoryRouter>
        <DeletedProvider>
          <TodoProvider>
            <TestRestoreTodoContext id={id} />
          </TodoProvider>
        </DeletedProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const restoreButton = screen.getByTestId('restore-todo-button');
      await userEvent.click(restoreButton);
    });

    await waitFor(() => {
      const deletedTodoLength = screen.getByTestId('deletedTodo-length');
      const todoLength = screen.getByTestId('todo-length');
      const error = screen.getByTestId('restored-todo-error');
      const loadingState = screen.getByTestId('loading-state');

      expect(Number(deletedTodoLength.textContent)).toBe(0);
      expect(Number(todoLength.textContent)).toBe(4);
      expect(error.textContent).toBe('');
      expect(loadingState.textContent).toBe('loaded');
    });
  })
});