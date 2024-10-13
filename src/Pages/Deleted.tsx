import { useState } from 'react';
import DeletedHeader from '../Components/DeletedHeader';
import DeletedNote from '../Components/DeletedNote';
import DeletedNotesBody from '../Components/DeletedNotesBody';
import DeletedPasswordBody from '../Components/DeletedPasswordBody';
import DeletedTodos from '../Components/DeletedTodos';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Deleted() {
  const [option, setOption] = useState('password');


  return (
    <div>
      <Header />
      <DeletedHeader option={option} setOption={setOption} />
      {option === 'password' && <DeletedPasswordBody />}
      {option === 'note' && <DeletedNotesBody />}
      {option === 'todo' && <DeletedTodos />}
      <DeletedNote />
      <Footer />
    </div>
  );
}
