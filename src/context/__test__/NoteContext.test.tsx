import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, vi } from 'vitest';
import { NotesProvider } from '../NotesContext';
import useNotes from '../useNotes';

vi.mock('../graphql/client', () => {
  vi.fn().mockImplementation(async (query) => {
    if (query.includes('GetNotes')) {
      return {
        data: {
          getNotes: [],
        },
      };
    }
    return { data: {} };
  });
});

const TestNoteComponent = () => {
  const { notes, isLoading } = useNotes();
  return (
    <>
      <div data-testid="note-length">{notes.length}</div>;
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};
describe('Note context initial State', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with empty notes', async () => {
    render(
      <MemoryRouter>
        <NotesProvider>
          <TestNoteComponent />
        </NotesProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const noteLength = screen.getByTestId('note-length');
      const loadingState = screen.getByTestId('loading-state');
      expect(noteLength.textContent).toBe("0");
      expect(loadingState.textContent).toBe('loaded');
    });
  });
});
