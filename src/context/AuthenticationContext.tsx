import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL } from '../util/Interfaces';

interface Auth {
  id?: string;
  email: string;
  username?: string;
  password: string;
}

interface AuthState {
  auths: Auth[];
  isLoading: boolean;
  currentAuth: Partial<Auth> | null;
  error: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType extends AuthState {
  createAuth: (newUser: Auth) => Promise<void>;
  loginAuth: (newUser: Auth) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  signout: () => Promise<void>;
}

type AuthAction =
  | { type: 'loading' }
  | { type: 'auths/loaded'; payload: Auth[] }
  | { type: 'auth/loaded'; payload: Auth | null }
  | { type: 'auth/created'; payload: Auth }
  | { type: 'rejected'; payload: string };

const initialState: AuthState = {
  auths: [],
  isLoading: false,
  currentAuth: null,
  error: '',
};

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'auth/created':
      return {
        ...state,
        isLoading: false,
        auths: [...state.auths, action.payload],
        currentAuth: action.payload,
      };

    case 'auth/loaded':
      return {
        ...state,
        isLoading: false,
        currentAuth: action.payload,
      };

    case 'auths/loaded':
      return { ...state, isLoading: false, auths: action.payload };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthenticationProvider({ children }: AuthProviderProps) {
  const [{ auths, isLoading, error, currentAuth }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function createAuth(newAuth: Auth) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `mutation CreateUser(username:String!, email: String!, password: String!) {
            createUser(username:$username, email: $email, password: $password) {
              id
              username
              email
            }
          }`,
          variables: {
            usernamne: newAuth.username,
            email: newAuth.email,
            password: newAuth.password,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) throw new Error(data.errors[0].message);
      const createdAuth = data.data.createUser;
      dispatch({ type: 'auth/created', payload: createdAuth });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error creating new Auth',
      });
    }
  }

  async function loginAuth(user: Auth) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `mutation LoginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              id
              email
              username
            }
          }`,
          variables: {
            email: user.email,
            password: user.password,
          },
        }),
      });

      const data = await res.json();
      // console.log("data from create auth", user);
      if (data.errors) throw new Error(data.errors[0].message);
      const loggedUser = data.data.loginUser;
      dispatch({ type: 'auth/created', payload: loggedUser });

      // sessionStorage.setItem('UserAuth', JSON.stringify(loggedUser));
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error loggin Auth.',
      });
    }
  }

  async function checkAuthStatus() {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `query CurrentUser {
            currentUser {
              id
              email
              username
            }
          }`,
        }),
      });
      const data = await res.json();
      if (data.errors) throw new Error(data.errors[0].messasge);
      const currentUser = data.data.currentUser;
      dispatch({ type: 'auth/loaded', payload: currentUser });
      // sessionStorage.setItem('UserAuth', JSON.stringify(currentUser));
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error checking AuthStatus',
      });
      // sessionStorage.removeItem('UserAuth');
      dispatch({ type: 'auth/loaded', payload: null });
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // useEffect(() => {
  //   const storedUser = sessionStorage.getItem('UserAuth');
  //   if (storedUser) {
  //     dispatch({ type: 'auth/loaded', payload: JSON.parse(storedUser) });
  //     checkAuthStatus();
  //   } else {
  //     checkAuthStatus();
  //   }
  // }, []);

  async function signout() {
    dispatch({ type: 'loading' });
    try {
      await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation LogoutUser {
            logoutUser
          }`,
        }),
      });
      // sessionStorage.removeItem('UserAuth');
      dispatch({ type: 'auth/loaded', payload: null });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error signing you out',
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        createAuth,
        auths,
        isLoading,
        signout,
        error,
        currentAuth,
        loginAuth,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthenticationProvider;
