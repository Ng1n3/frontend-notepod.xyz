import { useContext } from 'react';
import { PasswordContext } from '../context/PasswordContext';

export default function usePasswords() {
  const context = useContext(PasswordContext);
  if (context === undefined)
    throw new Error('PasswordContext was used outside of the PasswordProvider');
  return context;
}
