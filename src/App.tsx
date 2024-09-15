import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Deleted from './Pages/Deleted';
import Notes from './Pages/Notes';
import Passwords from './Pages/Passwords';
import Todos from './Pages/Todos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
