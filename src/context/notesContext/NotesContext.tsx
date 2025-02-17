import {
  createContext,
} from 'react';
import { NotesContextType } from './types';

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);


