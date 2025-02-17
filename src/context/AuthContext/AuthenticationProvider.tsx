import { useReducer } from 'react';
import { BASE_URL } from '../../util/Interfaces';
import { AuthContext } from './AuthenticationContext';
import { initialState, reducer } from './reducer';
import { Auth, AuthProviderProps } from './types';

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
          query: `mutation CreateUser($username: String!, $email: String!, $password: String!) {
            createUser(username: $username, email: $email, password: $password) {
              id
              username
              email
            }
          }`,
          variables: {
            username: newAuth.username,
            email: newAuth.email,
            password: newAuth.password,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        dispatch({
          type: 'rejected',
          payload: data.errors[0].message,
        });
        return;
      }
      const createdAuth = data.data.createUser;
      dispatch({ type: 'auth/created', payload: createdAuth });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error creating new Auth',
      });
      throw new Error('An unexpected error occured during user creation');
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
      if (data.errors) {
        dispatch({
          type: 'rejected',
          payload: data.errors[0].message,
        });
        return;
      }
      const loggedUser = data.data.loginUser;
      dispatch({ type: 'auth/created', payload: loggedUser });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error loggin Auth.',
      });
      throw Error;
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
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload:
          error instanceof Error
            ? error.message
            : 'There was an error checking AuthStatus',
      });
      dispatch({ type: 'auth/loaded', payload: null });
    }
  }

  // useEffect(() => {
  //   checkAuthStatus();
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

export { AuthenticationProvider };
