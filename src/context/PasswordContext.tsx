import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import useSafeNavigate from '../hook/useSafeNavigate';
import { BASE_URL } from '../util/Interfaces';

// const BASE_URL = 'http://localhost:8000';

export interface Password {
  id?: string;
  fieldname: string;
  username?: string;
  email?: string;
  password: string;
  userId?: string;
}

interface PasswordState {
  passwords: Password[];
  isLoading: boolean;
  currentPassword: Partial<Password> | null;
  error: string;
}

interface PasswordProviderProps {
  children: ReactNode;
}

interface PasswordContextType extends PasswordState {
  createPassword: (newPassword: Password) => Promise<void>;
  fetchPassword: (id: string) => Promise<void>;
  setCurrentPassword: (password: Password | null) => void;
  clearCurrentPassword: () => void;
  updatePassword: (update: Password) => Promise<void>;
  deletePassword: (passwordId: string) => Promise<void>;
}

type PasswordAction =
  | { type: 'loading' }
  | { type: 'passwords/loaded'; payload: Password[] }
  | { type: 'password/loaded'; payload: Password }
  | { type: 'password/created'; payload: Password }
  | { type: 'password/cleared' }
  | { type: 'password/updated'; payload: Password }
  | { type: 'password/deleted'; payload: Password }
  | { type: 'rejected'; payload: string };

const initialState: PasswordState = {
  passwords: [],
  isLoading: false,
  currentPassword: null,
  error: '',
};

function reducer(state: PasswordState, action: PasswordAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'passwords/loaded':
      return { ...state, isLoading: false, passwords: action.payload };

    case 'password/loaded':
      return {
        ...state,
        isLoading: false,
        currentPassword: action.payload,
      };

    case 'password/created':
      return {
        ...state,
        isLoading: false,
        passwords: [...state.passwords, action.payload],
        currentPassword: action.payload,
      };

    case 'password/updated':
      return {
        ...state,
        isLoading: false,
        passwords: state.passwords.map((password) =>
          password.id === action.payload.id ? action.payload : password
        ),
        currentPassword: action.payload,
      };

    case 'password/deleted':
      return {
        ...state,
        isLoading: false,
        passwords: state.passwords.filter(
          (password) => password.id !== action.payload.id
        ),
        currentPassword:
          state.currentPassword?.id === action.payload.id
            ? null
            : state.currentPassword,
      };

    case 'password/cleared':
      return { ...state, isLoading: false, currentPassword: null };

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
    useReducer<(state: PasswordState, action: PasswordAction) => PasswordState>(
      reducer,
      initialState
    );

  const navigate = useSafeNavigate();

  const fetchPasswords = useCallback(async function () {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetPasswords($isDeleted: Boolean) {
              getPasswordFields(isDeleted: $isDeleted) {
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
      if (data.errors) {
        throw new Error(data.errors);
      }
      dispatch({
        type: 'passwords/loaded',
        payload: data.data.getPasswordFields,
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
        credentials: 'include',
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
      // console.log("created password", data);
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

  const fetchPassword = useCallback(async function (id: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query getPassowrd($id: String!) {
                getPasswordField(id: $id) {
                    id
                    email
                    username
                    password
                    fieldname
                    isDeleted
                    deletedAt
                    user {
                        email
                        username
                    }
                }
            } `,
          variables: {
            id,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const password = data.data.getPasswordField;
      dispatch({ type: 'password/loaded', payload: password });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was error fetching Password...',
      });
      throw Error;
    }
  }, []);

  async function deletePassword(passwordId: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation SoftDeletePassword($id: String!) {
          softDeletePassword(id: $id) {
              id
              fieldname
              username
              email
              password
              isDeleted
              deletedAt
              updatedAt
              user{
                  email
                  username
              }
          }
      }`,
          variables: { id: passwordId },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const deletedPassword = data.data.softDeletePassword;
      dispatch({ type: 'password/deleted', payload: deletedPassword });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting this password',
      });
    }
  }

  const setCurrentPassword = function (password: Password | null) {
    if (password) {
      dispatch({ type: 'password/loaded', payload: password });
      navigate(`/passwords/${password.id}`);
    } else {
      dispatch({ type: 'password/cleared' });
      navigate('/passwords');
    }
  };

  const clearCurrentPassword = useCallback(async function () {
    dispatch({ type: 'password/cleared' });
  }, []);

  async function updatePassword(updatedPassword: Password) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation UpdatePasswordField($id: String!, $fieldname: String, $email: String, $password: String, $username: String) {
          updatePassword(id: $id, fieldname: $fieldname, email: $email, password: $password, username: $username) {
               id
               fieldname
                email
                username
                password
                deletedAt
                isDeleted
                user {
                    email
                    username
                }
              }
            }`,
          variables: {
            id: updatedPassword.id,
            fieldname: updatedPassword.fieldname,
            email: updatedPassword.email,
            username: updatedPassword.username,
            password: updatedPassword.password,
          },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const password = data.data.updatePassword;
      dispatch({ type: 'password/updated', payload: password });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating password..',
      });
    }
  }

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        error,
        currentPassword,
        isLoading,
        updatePassword,
        setCurrentPassword,
        createPassword,
        deletePassword,
        clearCurrentPassword,
        fetchPassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export { PasswordProvider };
