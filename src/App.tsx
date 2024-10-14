import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Deleted from './Pages/Deleted';
import NotFound from './Pages/NotFound';
import Notes from './Pages/Notes';
import Passwords from './Pages/Passwords';
import Todos from './Pages/Todos';
import AuthenticationProvider from './context/AuthenticationContext';
import { DeletedProvider } from './context/DeletedContext';
import { NotesProvider } from './context/NotesContext';
import { PasswordProvider } from './context/PasswordContext';
import { TodoProvider } from './context/TodoContext';

const ErrorFallBack: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <h1>Oops! Something went Wrong.</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
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
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate replace to="/notes" />}
                    />
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
                  </Routes>
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
