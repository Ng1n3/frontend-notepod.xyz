import { createContext } from 'react';
import { PasswordContextType } from './types';

export const PasswordContext = createContext<PasswordContextType | undefined>(
  undefined
);
