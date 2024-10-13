import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import Deleted from './Pages/Deleted';
import Notes from './Pages/Notes';
import Passwords from './Pages/Passwords';
import Todos from './Pages/Todos';
import { DeletedProvider } from './context/DeletedContext';
import { NotesProvider } from './context/NotesContext';
import { PasswordProvider } from './context/PasswordContext';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <BrowserRouter>
      <DeletedProvider>
        <NotesProvider>
          <TodoProvider>
            <PasswordProvider>
              <Routes>
                <Route
                  path="/"
                  errorElement={<ErrorPage />}
                >
                  <Route path="notes" element={<Notes />} />
                  <Route path=":id" element={<Notes />} />
                </Route>
                <Route path="todos" element={<Todos />}>
                  <Route path=":id" element={<Todos />} />
                </Route>
                <Route path="passwords" element={<Passwords />}>
                  <Route path=":id" element={<Passwords />} />
                </Route>
                <Route path="/deleted" element={<Deleted />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </PasswordProvider>
          </TodoProvider>
        </NotesProvider>
      </DeletedProvider>
    </BrowserRouter>
  );
}

export default App;
