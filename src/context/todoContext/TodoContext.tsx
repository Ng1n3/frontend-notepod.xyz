import { createContext } from 'react';
import { TodoContextType } from './types';

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
