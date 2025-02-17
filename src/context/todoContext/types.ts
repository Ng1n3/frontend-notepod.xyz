import { Dispatch, ReactNode } from 'react';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Todo {
  id?: string;
  title: string;
  body: string;
  dueDate: Date;
  priority: Priority;
  userId?: string;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  currentTodo: Partial<Todo> | null;
  priority: Priority;
  error: string;
}

export interface TodoProviderProps {
  children: ReactNode;
}

export interface TodoContextType extends TodoState {
  createTodo: (newTodo: Todo) => Promise<void>;
  fetchTodo: (id: string, shownav: boolean) => Promise<void>;
  setCurrentTodo: (todo: Todo | null) => void;
  updateTodo: (update: Todo) => Promise<void>;
  dispatch: Dispatch<TodoActions>;
  searchTodo: (searchTerm: string) => Promise<void>;
  clearCurrentTodo: () => void;
  deleteTodo: (id: string) => Promise<void>;
  fetchTodos: () => Promise<void>;
}

export type TodoActions =
  | { type: 'loading' }
  | { type: 'todos/loaded'; payload: Todo[] }
  | { type: 'todo/loaded'; payload: Todo }
  | { type: 'todo/restored'; payload: Todo }
  | { type: 'todo/created'; payload: Todo }
  | { type: 'todo/cleared' }
  | { type: 'todo/updated'; payload: Todo }
  | { type: 'todo/deleted'; payload: Todo }
  | { type: 'rejected'; payload: string };
