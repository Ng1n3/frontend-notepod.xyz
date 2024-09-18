import { useContext } from 'react';
import { NotesContext } from './NotesContext';

export default function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined)
    throw new Error('NotesContext was used outside of the NotesProvider');

  return context;
}
