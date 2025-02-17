import { Dispatch, ReactNode } from 'react';
import { NotesAction } from '../notesContext/types';
import { PasswordAction } from '../passwordContext/types';
import { TodoActions } from '../todoContext/types';

export interface deletedPasswords {
  id: string;
  fieldname: string;
  username?: string;
  email?: string;
  password: string;
}

export enum Priority {
  Low,
  Medium,
  High,
}

export interface deletedTodos {
  id: string;
  title: string;
  body: string;
  dueDate: Date;
  priority: Priority;
}

export interface deletedNotes {
  id: string;
  title: string;
  body: string;
  deletedAt: Date;
}

export interface DeletedState {
  deletedTodos: deletedTodos[];
  deletedPasswords: deletedPasswords[];
  deletedNotes: deletedNotes[];
  currentDeletedNote: Partial<deletedNotes> | null;
  currentDeletedTodo: Partial<deletedTodos> | null;
  currentDeletedPassword: Partial<deletedPasswords> | null;
  isLoading: boolean;
  error: string;
}

export interface DeletedProviderProps {
  children: ReactNode;
}

export interface DeletedContextType extends DeletedState {
  fetchDeletedItems: () => Promise<void>;
  restoreDeletedNotes: (
    noteId: string,
    notesDispatch?: Dispatch<NotesAction>
  ) => Promise<void>;
  restoreDeletedTodo: (
    todoId: string,
    todoDispatch?: Dispatch<TodoActions>
  ) => Promise<void>;
  restoreDeletedPassword: (
    passwordId: string,
    passwordDispatch?: Dispatch<PasswordAction>
  ) => Promise<void>;
}

export type actionTypes =
  | { type: 'loading' }
  | {
      type: 'deletedPasswords/loaded';
      payload: { passwords: deletedPasswords[] };
    }
  | { type: 'deletedPassword/loaded'; payload: deletedPasswords }
  | { type: 'deletedPassword/restore'; payload: { id: string } }
  | { type: 'deletedNotes/loaded'; payload: { notes: deletedNotes[] } }
  | { type: 'deletedNote/loaded'; payload: deletedNotes }
  | { type: 'deletedNote/restore'; payload: { id: string } }
  | {
      type: 'deletedTodos/loaded';
      payload: { todos: deletedTodos[] };
    }
  | { type: 'deletedTodo/loaded'; payload: deletedTodos }
  | { type: 'deletedTodo/restore'; payload: { id: string } }
  | { type: 'rejected'; payload: string };
