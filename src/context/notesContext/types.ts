import { Dispatch, ReactNode } from "react";

export interface Note {
  id?: string;
  title: string;
  body: string;
  updatedAt?: Date;
  userId: string;
  // deletedAt: Date;
}

export interface NoteState {
  notes: Note[];
  isLoading: boolean;
  currentNote: Partial<Note> | null;
  error: string;
}

export interface NotesProvideProps {
  children: ReactNode;
}

export interface NotesContextType extends NoteState {
  createNote: (newNote: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
  dispatch: Dispatch<NotesAction>;
  fetchNote: (id: string, shownav: boolean) => Promise<void>;
  updateNote: (updatedNote: Note) => Promise<void>;
  setCurrentNote: (note: Note | null) => void;
  clearCurrentNote: () => void;
  restoreNoteFromDeleted: (restoredNote: Note) => Promise<void>;
}

export type NotesAction =
  | { type: 'loading' }
  | { type: 'notes/loaded'; payload: Note[] }
  | { type: 'note/loaded'; payload: Note }
  | { type: 'note/created'; payload: Note }
  | { type: 'note/restored'; payload: Note }
  | { type: 'note/deleted'; payload: Note }
  | { type: 'note/cleared' }
  | { type: 'note/updated'; payload: Note }
  | { type: 'rejected'; payload: string };