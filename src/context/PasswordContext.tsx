import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

interface Password {
  id: number;
  fieldname: string;
  username?: string;
  email?: string;
  password: string;
}

interface PasswordState {
  passwords: Password[];
  isLoading: boolean;
  currentPassword: Partial<Password>;
  error: string;
}

interface PasswordProviderProps {
  children: ReactNode;
}

interface PasswordContextType extends PasswordState {
  createPassword: (newPassword: Password) => Promise<void>;
}

type PasswordAction =
  | { type: 'loading' }
  | { type: 'passwords/loaded'; payload: Password[] }
  | { type: 'password/loaded'; payload: Password }
  | { type: 'password/created'; payload: Password }
  | { type: 'rejected'; payload: string };

const initialState: PasswordState = {
  passwords: [],
  isLoading: false,
  currentPassword: {},
  error: '',
};

function reducer(state: PasswordState, action: PasswordAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'passwords/loaded':
      return { ...state, isLoading: false, passwords: action.payload };

    case 'password/loaded':
      return { ...state, isLoading: false, currentPassword: action.payload };

    case 'password/created':
      return {
        ...state,
        isLoading: false,
        passwords: [...state.passwords, action.payload],
        currentPassword: action.payload,
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

export const PasswordContext = createContext<PasswordContextType | undefined>(
  undefined
);

function PasswordProvider({ children }: PasswordProviderProps) {
  const [{ passwords, error, currentPassword, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchPasswords() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query GetPasswords($isDeleted: Boolean) {
              getPasswordField(isDeleted: $isDeleted) {
                id,
                fieldname,
                username,
                email,
                password,
                isDeleted,
                deletedAt,
                user {
                  email,
                  username
                }
              }
            }`,
            variables: {
              isDeleted: false,
            },
          }),
        });
        const data = await res.json();
        // console.log("password context: ", data);
        dispatch({
          type: 'passwords/loaded',
          payload: data.data.getPasswordField,
        });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }
    fetchPasswords();
  }, []);

  async function createPassword(newPassword: Password) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/passwords`, {
        method: 'POST',
        body: JSON.stringify(newPassword),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'password/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a password..',
      });
    }
  }
  return (
    <PasswordContext.Provider
      value={{ passwords, error, currentPassword, isLoading, createPassword }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export { PasswordProvider };
