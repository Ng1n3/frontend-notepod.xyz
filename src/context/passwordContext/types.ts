import { Dispatch, ReactNode } from 'react';

export interface Password {
  id?: string;
  fieldname: string;
  username?: string;
  email?: string;
  password: string;
  userId?: string;
}

export interface PasswordState {
  passwords: Password[];
  isLoading: boolean;
  currentPassword: Partial<Password> | null;
  error: string;
}

export interface PasswordProviderProps {
  children: ReactNode;
}

export interface PasswordContextType extends PasswordState {
  createPassword: (newPassword: Password) => Promise<void>;
  fetchPassword: (id: string) => Promise<void>;
  dispatch: Dispatch<PasswordAction>;
  fetchPasswords: () => Promise<void>;
  setCurrentPassword: (password: Password | null) => void;
  clearCurrentPassword: () => void;
  updatePassword: (update: Password) => Promise<void>;
  deletePassword: (passwordId: string) => Promise<void>;
}

export type PasswordAction =
  | { type: 'loading' }
  | { type: 'passwords/loaded'; payload: Password[] }
  | { type: 'password/loaded'; payload: Password }
  | { type: 'password/created'; payload: Password }
  | { type: 'password/restored'; payload: Password }
  | { type: 'password/cleared' }
  | { type: 'password/updated'; payload: Password }
  | { type: 'password/deleted'; payload: Password }
  | { type: 'rejected'; payload: string };
