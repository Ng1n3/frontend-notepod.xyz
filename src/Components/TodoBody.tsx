import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import List from './List';
import styles from './TodoBody.module.css';

export default function TodoBody() {
  return (
    <>
      <div className={styles.body}>
        <CurrentTodo />
        <List />
      </div>
      <Footer />
    </>
  );
}
