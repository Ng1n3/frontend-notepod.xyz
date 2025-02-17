import { useContext } from 'react';
import { NotesContext } from '../context/notesContext/';

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined)
    throw new Error('NotesContext was used outside of the NotesProvider');

  return context;
}
