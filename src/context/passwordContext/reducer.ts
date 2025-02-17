import { PasswordAction, PasswordState } from "./types";

export const initialState: PasswordState = {
  passwords: [],
  isLoading: false,
  currentPassword: null,
  error: '',
};

export function reducer(state: PasswordState, action: PasswordAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'passwords/loaded':
      return { ...state, isLoading: false, passwords: action.payload };

    case 'password/loaded':
      return {
        ...state,
        isLoading: false,
        currentPassword: action.payload,
      };

    case 'password/created':
      return {
        ...state,
        isLoading: false,
        passwords: [...state.passwords, action.payload],
        currentPassword: action.payload,
      };

    case 'password/restored':
      return {
        ...state,
        isLoaded: false,
        passwords: [...state.passwords, action.payload],
      };

    case 'password/updated':
      return {
        ...state,
        isLoading: false,
        passwords: state.passwords.map((password) =>
          password.id === action.payload.id ? action.payload : password
        ),
        currentPassword: action.payload,
      };

    case 'password/deleted':
      return {
        ...state,
        isLoading: false,
        passwords: state.passwords.filter(
          (password) => password.id !== action.payload.id
        ),
        currentPassword:
          state.currentPassword?.id === action.payload.id
            ? null
            : state.currentPassword,
      };

    case 'password/cleared':
      return { ...state, isLoading: false, currentPassword: null };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}