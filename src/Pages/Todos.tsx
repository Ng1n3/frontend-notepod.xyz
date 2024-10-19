import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import TodoBody from '../Components/TodoBody';
import useTodos from '../context/useTodos';

export default function Todos() {
  const { id } = useParams();
  const { fetchTodo } = useTodos();
  const fetchTodoRef = useRef(fetchTodo);

  useEffect(() => {
    fetchTodoRef.current = fetchTodo;
  }, [fetchTodo]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          await fetchTodoRef.current(id);
        } catch (error) {
          console.error('error fetching Todos', error);
        }
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <div>
        <TodoBody />
      </div>
    </>
  );
}