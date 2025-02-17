import { ReactNode } from 'react';

export interface Auth {
  id?: string;
  email: string;
  username?: string;
  password: string;
}

export interface AuthState {
  auths: Auth[];
  isLoading: boolean;
  currentAuth: Partial<Auth> | null;
  error: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType extends AuthState {
  createAuth: (newUser: Auth) => Promise<void>;
  loginAuth: (newUser: Auth) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  signout: () => Promise<void>;
  isAuthenticated: boolean;
}

export type AuthAction =
  | { type: 'loading' }
  | { type: 'auths/loaded'; payload: Auth[] }
  | { type: 'auth/loaded'; payload: Auth | null }
  | { type: 'auth/created'; payload: Auth }
  | { type: 'rejected'; payload: string };
