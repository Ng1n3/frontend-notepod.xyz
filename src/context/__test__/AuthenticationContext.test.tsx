import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { nanoid } from 'nanoid';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import AuthenticationProvider from '../AuthenticationContext';

const InitialAuthContext = () => {
  const { isLoading, currentAuth, error, auths } = useAuth();
  return (
    <>
      <div data-testid="auth-length">{auths.length}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="current-auth-id">{currentAuth?.id}</div>
      <div data-testid="current-auth-email">{currentAuth?.email}</div>
      <div data-testid="current-auth-username">{currentAuth?.username}</div>
      <div data-testid="current-auth-error">{error}</div>
    </>
  );
};

describe('Initial state of Authentication', () => {
  it('it should give the intial state of the authservice', async () => {
    render(
      <MemoryRouter>
        <AuthenticationProvider>
          <InitialAuthContext />
        </AuthenticationProvider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const loadingState = screen.getByTestId('loading-state');
        expect(loadingState.textContent).toBe('loaded');
      },
      { timeout: 5000 }
    );

    const authLength = screen.getByTestId('auth-length');
    expect(Number(authLength.textContent)).toBe(0);

    const authId = screen.getByTestId('current-auth-id');
    expect(authId.textContent).toBe('');

    const authEmail = screen.getByTestId('current-auth-email');
    expect(authEmail.textContent).toBe('');

    const authUsername = screen.getByTestId('current-auth-username');
    expect(authUsername.textContent).toBe('');

    const authError = screen.getByTestId('current-auth-error');
    expect(authError.textContent).toBe('');
  });
});

interface NewAuth {
  id: string;
  username: string;
  email: string;
  password: string;
}

const TestAuthCreateContext = ({ id, email, username, password }: NewAuth) => {
  const { isLoading, createAuth, currentAuth } = useAuth();

  return (
    <>
      <button
        data-testid="create-user"
        onClick={() => createAuth({ id, email, username, password })}
      >
        Create User
      </button>
      <div data-testid="current-auth">
        <div data-testid="auth-email">{currentAuth?.email}</div>
        <div data-testid="auth-username">{currentAuth?.username}</div>
        <div data-testid="auth-password">{currentAuth?.password}</div>
        <div data-testid="loading-state">
          {isLoading ? 'loading' : 'loaded'}
        </div>
      </div>
    </>
  );
};

describe('Create an Account', () => {
  it('should create a new user', async () => {
    const authId = nanoid(10);
    const newUser = {
      id: authId,
      email: 'tom@gmail.com',
      username: 'tom_22',
      password: 'tom_22_tom',
    };
    render(
      <MemoryRouter>
        <AuthenticationProvider>
          <TestAuthCreateContext
            username={newUser.username}
            id={newUser.id}
            email={newUser.email}
            password={newUser.password}
          />
        </AuthenticationProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const createButton = screen.getByTestId('create-user');
      await userEvent.click(createButton);
    });

    await waitFor(() => {
      const authEmail = screen.getByTestId('auth-email');
      expect(authEmail.textContent).toBe(newUser.email);

      const authUsername = screen.getByTestId('auth-username');
      expect(authUsername.textContent).toBe(newUser.username);

      const authPassword = screen.getByTestId('auth-password');
      expect(authPassword.textContent).toBe(newUser.password);
    });
  });
});

interface Login {
  email: string;
  password: string;
}

const TestAuthLoginContext = ({ email, password }: Login) => {
  const { isLoading, loginAuth, currentAuth } = useAuth();

  return (
    <>
      <button
        data-testid="login-user"
        onClick={() => loginAuth({ email, password })}
      >
        Login User
      </button>
      <div data-testid="current-auth">
        <div data-testid="auth-email">{currentAuth?.email}</div>
        <div data-testid="auth-password">{currentAuth?.password}</div>
        <div data-testid="loading-state">
          {isLoading ? 'loading' : 'loaded'}
        </div>
      </div>
    </>
  );
};

describe('Login with credentials', () => {
  it('logins a user with correct credentials', async () => {
    const userDetails = {
      email: 'new1@gmail.com',
      password: 'new121kk2',
    };

    render(
      <MemoryRouter>
        <AuthenticationProvider>
          <TestAuthLoginContext
            email={userDetails.email}
            password={userDetails.password}
          />
        </AuthenticationProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const loginButton = screen.getByTestId('login-user');
      await userEvent.click(loginButton);
    });
    await waitFor(() => {
      const authEmail = screen.getByTestId('auth-email');
      const loadingState = screen.getByTestId('loading-state');

      expect(authEmail).toHaveTextContent(userDetails.email);
      expect(loadingState).toHaveTextContent('loaded');
    });
  });
});

const TestAuthLogoutContext = ({ email, password }: Login) => {
  const { isLoading, loginAuth, currentAuth, signout } = useAuth();

  return (
    <>
      <button
        data-testid="login-user"
        onClick={() => loginAuth({ email, password })}
      >
        Login User
      </button>
      <button data-testid="logout-user" onClick={() => signout()}>
        logout
      </button>
      <div data-testid="current-auth">
        <div data-testid="auth-email">{currentAuth?.email}</div>
        <div data-testid="auth-password">{currentAuth?.password}</div>
        <div data-testid="loading-state">
          {isLoading ? 'loading' : 'loaded'}
        </div>
      </div>
    </>
  );
};

describe('Signs out a user', () => {
  it('signouts out the user from the app', async () => {
    const userDetails = {
      email: 'new1@gmail.com',
      password: 'new121kk2',
    };

    render(
      <MemoryRouter>
        <AuthenticationProvider>
          <TestAuthLogoutContext
            email={userDetails.email}
            password={userDetails.password}
          />
        </AuthenticationProvider>
      </MemoryRouter>
    );

    await act(async () => {
      const loginButton = screen.getByTestId('login-user');
      await userEvent.click(loginButton);
    });
    await waitFor(async () => {
      const authEmail = screen.getByTestId('auth-email');
      const loadingState = screen.getByTestId('loading-state');

      expect(authEmail).toHaveTextContent(userDetails.email);
      expect(loadingState).toHaveTextContent('loaded');

    });
      await act(async () => {
        const logoutButton = screen.getByTestId('logout-user');
        await userEvent.click(logoutButton);
      });

      await waitFor(() => {
        const authEmail = screen.getByTestId('auth-email');
        const loadingState = screen.getByTestId('loading-state');
  
        expect(authEmail).toBeEmptyDOMElement();
        expect(loadingState).toHaveTextContent('loaded');
      })
  });
});
