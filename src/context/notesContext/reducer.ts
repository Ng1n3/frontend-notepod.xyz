import { NotesAction, NoteState } from "./types";

export const initalState: NoteState = {
  notes: [],
  isLoading: false,
  currentNote: null,
  error: '',
};

export function reducer(state: NoteState, action: NotesAction) {
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

    case 'note/restored':
      return {
        ...state,
        isLoaded: false,
        notes: [...state.notes, action.payload],
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
