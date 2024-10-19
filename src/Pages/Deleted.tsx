import { useState } from 'react';
import DeletedHeader from '../Components/DeletedHeader';
import DeletedNote from '../Components/DeletedNote';
import DeletedNotesBody from '../Components/DeletedNotesBody';
import DeletedPasswordBody from '../Components/DeletedPasswordBody';
import DeletedTodos from '../Components/DeletedTodos';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import NotAllowed from '../Components/NotAllowed';
// import useDeleted from '../context/useDeleted';
import useAuth from '../context/useAuth';

export default function Deleted() {
  const [option, setOption] = useState('password');
  // const { currentDeletedNote, currentDeletedPassword, currentDeletedTodo } =
  //   useDeleted();
  const {currentAuth} = useAuth()
  console.log(currentAuth);

  // const hasDeletedItems =
  //   currentDeletedNote || currentDeletedPassword || currentDeletedTodo;

  return (
    <div>
      <Header />
      {currentAuth ? (
        <>
          <DeletedHeader option={option} setOption={setOption} />
          {option === 'password' && <DeletedPasswordBody />}
          {option === 'note' && <DeletedNotesBody />}
          {option === 'todo' && <DeletedTodos />}
          <DeletedNote />
        </>
      ) : (
        <NotAllowed />
      )}
      <Footer />
    </div>
  );
}
