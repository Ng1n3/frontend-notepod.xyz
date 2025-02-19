import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Deleted from './Pages/Deleted';
import NotFound from './Pages/NotFound';
import Notes from './Pages/Notes';
import Passwords from './Pages/Passwords';
import Todos from './Pages/Todos';
import { AuthenticationProvider } from './context/AuthContext/';
import { DeletedProvider } from './context/deletedContext/';
import { NotesProvider } from './context/notesContext/';
import { PasswordProvider } from './context/passwordContext/';
import { TodoProvider } from './context/todoContext/';
import { useAuth } from './hook/useAuth';

const ErrorFallBack: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <h1>Oops! Something went Wrong.</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/signin"
        element={
          !isAuthenticated ? (
            <Signin destination="notes" />
          ) : (
            <Navigate to="/notes" replace />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? (
            <Signup destination="notes" />
          ) : (
            <Navigate to="/notes" replace />
          )
        }
      />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate replace to="/notes" />} />
          <Route path="notes">
            <Route index element={<Notes />} />
            <Route path=":id" element={<Notes />} />
          </Route>

          <Route path="todos">
            <Route index element={<Todos />} />
            <Route path=":id" element={<Todos />} />
          </Route>

          <Route path="passwords">
            <Route index element={<Passwords />} />
            <Route path=":id" element={<Passwords />} />
          </Route>
          <Route path="/deleted" element={<Deleted />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate replace to="/signin" />} />
      )}
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <BrowserRouter>
        <AuthenticationProvider>
          <DeletedProvider>
            <NotesProvider>
              <TodoProvider>
                <PasswordProvider>
                  <AppRoutes />
                  <ToastContainer
                    theme="light"
                    position="top-left"
                    autoClose={1000}
                    closeOnClick
                    transition={Slide}
                  />
                </PasswordProvider>
              </TodoProvider>
            </NotesProvider>
          </DeletedProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
