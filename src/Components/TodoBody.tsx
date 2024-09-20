import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import styles from './TodoBody.module.css';
import TodoListBody from './TodoListBody';

export default function TodoBody() {
  return (
    <>
      <div className={styles.body}>
        <CurrentTodo />
        <TodoListBody/>
      </div>
      <Footer />
    </>
  );
}
