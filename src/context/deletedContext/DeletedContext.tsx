import {
  createContext,
} from 'react';
import { DeletedContextType } from './types';

export const DeletedContext = createContext<DeletedContextType | undefined>(
  undefined
);




