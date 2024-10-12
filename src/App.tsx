import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
                <Route path="/notes" element={<Notes />} />
                <Route path="/notes/:id" element={<Notes />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/todos/:id" element={<Todos />} />
                <Route path="/passwords" element={<Passwords />} />
                <Route path="/passwords/:id" element={<Passwords />} />
                <Route path="/deleted" element={<Deleted />} />
              </Routes>
            </PasswordProvider>
          </TodoProvider>
        </NotesProvider>
      </DeletedProvider>
    </BrowserRouter>
  );
}

export default App;
