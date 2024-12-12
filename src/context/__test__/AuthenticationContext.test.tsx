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
        {/* <div data-testid="auth-id">{currentAuth?.id}</div> */}
        <div data-testid="auth-email">{currentAuth?.email}</div>
        <div data-testid="auth-username">{currentAuth?.username}</div>
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

      const authUsername = screen.getByTestId('auth-username')
      expect(authUsername.textContent).toBe(newUser.username)
    });
  });
});
