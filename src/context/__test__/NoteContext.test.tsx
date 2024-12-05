import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe } from 'vitest';
import { NotesProvider } from '../NotesContext';
import useNotes from '../useNotes';

const TestNoteContext = () => {
  const { notes, isLoading } = useNotes();
  return (
    <>
      <div data-testid="note-length">{notes.length}</div>;
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};
describe('Note context initial State', () => {
  it('should give an array of all  notes', async () => {
    render(
      <MemoryRouter>
        <NotesProvider>
          <TestNoteContext />
        </NotesProvider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const noteLength = screen.getByTestId('note-length');
        const loadingState = screen.getByTestId('loading-state');
        expect(noteLength.textContent).toBe('3');
        expect(loadingState.textContent).toBe('loaded');
      },
      { timeout: 5000 }
    );
  });
});
