import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import TodoBody from '../Components/TodoBody';
import useTodos from '../context/useTodos';

export default function Todos() {
  const { id } = useParams();
  const { fetchTodo, setCurrentTodo } = useTodos();

  useEffect(
    function () {
      if (id) {
        fetchTodo(id);
      } else {
        setCurrentTodo(null)
      }
    },
    [id]
  );

  return (
    <>
      <Header />
      <div>
        <TodoBody />
      </div>
    </>
  );
}
