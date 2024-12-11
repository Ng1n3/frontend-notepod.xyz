import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import usePasswords from '../../hook/usePassword';
import { PasswordProvider } from '../PasswordContext';
const TestPasswordListComponent = () => {
  const { passwords, isLoading } = usePasswords();
  return (
    <>
      <div data-testid="password-length">{passwords.length}</div>;
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

describe('Passwords initial state', () => {
  it('should give an array of passwords', async () => {
    render(
      <MemoryRouter>
        <PasswordProvider>
          <TestPasswordListComponent />
        </PasswordProvider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const passwordsLength = screen.getByTestId('password-length');
        const loadingState = screen.getByTestId('loading-state');
        expect(passwordsLength.textContent).toBe('4');
        expect(loadingState.textContent).toBe('loaded');
      },
      { timeout: 5000 }
    );
  });
});

const TestPasswordFetchPasswordComponent = ({
  passwordId,
}: {
  passwordId: string;
}) => {
  const { isLoading, fetchPassword, currentPassword } = usePasswords();

  return (
    <>
      <button
        data-testid="fetch-password"
        onClick={() => fetchPassword(passwordId)}
      >
        Fetch Password
      </button>
      <div data-testid="current-password">
        <div data-testid="password-id">{currentPassword?.id}</div>
        <div data-testid="password-fieldname">{currentPassword?.fieldname}</div>
        <div data-testid="password-password">{currentPassword?.password}</div>
        <div data-testid="password-username">{currentPassword?.username}</div>
        <div data-testid="password-email">{currentPassword?.email}</div>
      </div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

describe('Get a single password field in password context', () => {
  it('should give a single password using the password id', async () => {
    const passwordid = 'A2KjLqBX92';

    render(
      <MemoryRouter>
        <PasswordProvider>
          <TestPasswordFetchPasswordComponent passwordId={passwordid} />
        </PasswordProvider>
      </MemoryRouter>
    );

    user.click(screen.getByTestId('fetch-password'));

    await waitFor(() => {
      const passId = screen.getByTestId('password-id');
      const passFieldname = screen.getByTestId('password-fieldname');
      const passPassword = screen.getByTestId('password-password');
      const passUsername = screen.getByTestId('password-username');
      const passEmail = screen.getByTestId('password-email');

      expect(passId.textContent).toBe(passwordid);
      expect(passFieldname.textContent).toMatch(/^facebook$/i);
      expect(passEmail.textContent).toMatch(/^fb_star99@gmail.com$/i);
      expect(passPassword.textContent).toMatch(/^password123$/i);
      expect(passUsername.textContent).toMatch(/^fb_star99$/i);
    });
  });
});
