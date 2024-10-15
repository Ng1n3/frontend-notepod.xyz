import useTodos from '../context/useTodos';
import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import Signin from './Signin';
import styles from './TodoBody.module.css';
import TodoListBody from './TodoListBody';

export default function TodoBody() {
  const { currentTodo } = useTodos();

  return (
    <>
      <div className={styles.body}>
        <CurrentTodo />
        {currentTodo ? <TodoListBody /> : <Signin destination="todos" />}
      </div>
      <Footer />
    </>
  );
}
