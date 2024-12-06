import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
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

const TestSingleNoteContext = ({ noteId }: { noteId: string }) => {
  const { isLoading, currentNote, fetchNote } = useNotes();

  return (
    <>
      <button data-testid="fetch-note" onClick={() => fetchNote(noteId)}>
        Fetch Note
      </button>
      {isLoading ? (
        <div data-testid="loading-state">...Loading</div>
      ) : (
        <div data-testid="current-note">
          <div data-testid="note-id">{currentNote?.id}</div>
          <div data-testid="note-title">{currentNote?.title}</div>
          <div data-testid="note-body">{currentNote?.body}</div>
        </div>
      )}
    </>
  );
};

describe('Get a single note using note context', () => {
  it('should fetch a single note using the note id', async () => {
    const testNoteId = 'BIdqeEi8Gx';


    render(
      <MemoryRouter>
        <NotesProvider>
          <TestSingleNoteContext noteId={testNoteId} />
        </NotesProvider>
      </MemoryRouter>
    );

    user.click(screen.getByTestId('fetch-note'));

    await waitFor(
      () => {
        const noteId = screen.getByTestId('note-id');
        const noteTitle = screen.getByTestId('note-title');
        const noteBody = screen.getByTestId('note-body');

        expect(noteId.textContent).toBe(testNoteId);
        expect(noteTitle.textContent).toBe('New third note');
        expect(noteBody.textContent).toBe('This is a third new note from me');
      },
      { timeout: 5000 }
    );
  });

});
describe('Create a single note', () => {
  it('should create a note and add it to the list of current notes', async () => {
    
  })
})
