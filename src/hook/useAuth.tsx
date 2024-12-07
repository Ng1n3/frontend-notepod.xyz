import { useContext } from 'react';
import { AuthContext } from '../context/AuthenticationContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of the AuthProvider');
  return context;
}
