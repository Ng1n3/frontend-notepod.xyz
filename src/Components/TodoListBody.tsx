import TodoListItem from './TodoListItem';
import styles from './NoteListBody.module.css'
import ListHeader from './ListHeader';
import useTodos from '../context/useTodos';
import Spinner from './Spinner';

export default function TodoListBody() {
  const {todos, isLoading} = useTodos()
  if(isLoading) return <Spinner/>
  return (
    <div>
      <ListHeader/>
      <div className={styles.listBody}>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </div>
  );
}
