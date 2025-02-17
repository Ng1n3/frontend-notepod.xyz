import { AuthAction, AuthState } from './types';

export const initialState: AuthState = {
  auths: [],
  isLoading: false,
  currentAuth: null,
  error: '',
};

export function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'auth/created':
      return {
        ...state,
        isLoading: false,
        auths: [...state.auths, action.payload],
        currentAuth: action.payload,
      };

    case 'auth/loaded':
      return {
        ...state,
        isLoading: false,
        currentAuth: action.payload,
      };

    case 'auths/loaded':
      return { ...state, isLoading: false, auths: action.payload };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}
