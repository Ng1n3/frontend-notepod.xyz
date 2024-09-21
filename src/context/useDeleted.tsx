import { useContext } from 'react';
import { DeletedContext } from './DeletedContext';

export default function useDeleted() {
  const context = useContext(DeletedContext);
  if (context === undefined)
    throw new Error('DeletedContext was used outside of the DeletedProvider');
  return context;
}
