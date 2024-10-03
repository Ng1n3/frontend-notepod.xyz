import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

interface Password {
  // id: number;
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

  const fetchPasswords = useCallback(async function () {
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
  }, []);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  async function createPassword(newPassword: Password) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation CreatePassword($fieldname: String!, $username: String $password: String, $email: String) {
            createPassword(fieldname: $fieldname, password: $password, username: $username, email: $email) {
              id
              fieldname
              email
              password
              username
              isDeleted
              deletedAt
              user {
                  username
                  email
              }
            }
          }`,
          variables: {
            fieldname: newPassword.fieldname,
            email: newPassword.email,
            password: newPassword.password,
            username: newPassword.username,
          },
        }),
      });
      const data = await res.json();
      // console.log("newPassword from context: ", data);
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'password/created', payload: data.data.createPassword });
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
