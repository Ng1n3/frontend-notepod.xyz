import useAuth from '../context/useAuth';
import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import Signin from './Signin';
import styles from './TodoBody.module.css';
import TodoListBody from './TodoListBody';

export default function TodoBody() {

  const {currentAuth} = useAuth()

  return (
    <>
      <div className={styles.body}>
        <CurrentTodo />
        {currentAuth ? <TodoListBody /> : <Signin destination="todos" />}
      </div>
      <Footer />
    </>
  );
}
