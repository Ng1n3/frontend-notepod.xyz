import { actionTypes, DeletedState } from "./types";

export const initalState: DeletedState = {
  deletedNotes: [],
  deletedTodos: [],
  deletedPasswords: [],
  isLoading: false,
  currentDeletedTodo: null,
  currentDeletedNote: null,
  currentDeletedPassword: null,
  error: '',
};



export function reducer(state: DeletedState, action: actionTypes) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'deletedPasswords/loaded':
      return {
        ...state,
        isLoading: false,
        deletedPasswords: action.payload.passwords,
      };

    case 'deletedPassword/loaded':
      return {
        ...state,
        isLoading: false,
        currentDeletedPassword: action.payload,
      };

    case 'deletedPassword/restore':
      return {
        ...state,
        isLoading: false,
        deletedPasswords: state.deletedPasswords.filter(
          (password) => password.id !== action.payload.id
        ),
      };

    case 'deletedNote/loaded':
      return { ...state, isLoading: false, currentDeletedNote: action.payload };

    case 'deletedNotes/loaded':
      return {
        ...state,
        isLoading: false,
        deletedNotes: action.payload.notes || [],
      };

    case 'deletedNote/restore':
      return {
        ...state,
        isLoading: false,
        deletedNotes: state.deletedNotes.filter(
          (note) => note.id !== action.payload.id
        ),
      };

    case 'deletedTodos/loaded':
      return {
        ...state,
        isLoading: false,
        deletedTodos: action.payload.todos || action.payload,
      };

    case 'deletedTodo/loaded':
      return { ...state, isLoading: false, currentDeletedTodo: action.payload };

    case 'deletedTodo/restore':
      return {
        ...state,
        isLoading: false,
        deletedTodos: state.deletedTodos.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}