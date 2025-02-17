import { useEffect } from 'react';
import { useAuth } from '../hook/useAuth';
import useTodos from '../hook/useTodos';
import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import ListTodo from './ListTodo';
import Signin from './Signin';
import styles from './TodoBody.module.css';

export default function TodoBody() {
  const { currentAuth } = useAuth();
  const { fetchTodos } = useTodos();

  useEffect(
    function () {
      fetchTodos();
    },
    [fetchTodos]
  );
  return (
    <>
      <div className={styles.body}>
        <CurrentTodo />
        {currentAuth ? (
          <ListTodo type="todo" />
        ) : (
          <Signin destination="todos" />
        )}
      </div>
      <Footer />
    </>
  );
}
