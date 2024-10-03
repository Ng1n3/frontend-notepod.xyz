import useTodos from '../context/useTodos';
import ListHeader from './ListHeader';
import styles from './NoteListBody.module.css';
import Spinner from './Spinner';
import TodoListItem from './TodoListItem';

export default function TodoListBody() {
  const { todos, isLoading } = useTodos();
  // console.log('todos from todolist body: ', todos);

  if (isLoading) return <Spinner />;
  return (
    <div>
      <ListHeader />
      <div className={styles.listBody}>
        {todos && todos.length > 0
          ? todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
          : null}
      </div>
    </div>
  );
}
