import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useDeleted from '../../hook/useDeleted';
import { DeletedProvider } from '../DeletedContext';

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
