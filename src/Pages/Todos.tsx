import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import TodoBody from '../Components/TodoBody';
import useTodos from '../context/useTodos';

export default function Todos() {
  const { id } = useParams();
  const { fetchTodo } = useTodos();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          await fetchTodo(id);
        } catch (error) {
          console.error('error fetching Todos', error);
        }
      }
    }
    fetchData();
  }, [id, fetchTodo]);

  return (
    <>
      <Header />
      <div>
        <TodoBody />
      </div>
    </>
  );
}
