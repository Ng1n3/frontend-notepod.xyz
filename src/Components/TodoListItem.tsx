import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTodos from '../context/useTodos';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import styles from './NoteListItem.module.css';


enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

interface TodoListItem {
  id: string;
  title: string;
  body: string;
  priority: Priority;
  dueDate: Date;
  // deletedDate?: string;
}

interface TodoListItemProp {
  todo: TodoListItem;
}

const TODO_HEADER_NUM = 3;
const TODO_BODY_NUM = 15;

export default function TodoListItem({ todo }: TodoListItemProp) {
  const { id, title, body, dueDate, priority } = todo;
  // console.log("todo from todo list item", todo);
  const { setCurrentTodo } = useTodos();
  function handleTodoClick() {
    // console.log("Hi there youclicked me!");
    setCurrentTodo({task:title, description: body, priority, id, dueDate});
  }
  return (
    <div className={styles.body} onClick={handleTodoClick}>
      <header className={styles.header}>
        <h2>{shortentext(title, TODO_HEADER_NUM)}</h2>
        <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#EC7A7C" />
      </header>
      <p>
        <span>{shortentext(body, TODO_BODY_NUM)}</span>
      </p>
      <div className={styles.h3s}>
        <h3>Due date: {formatDate(dueDate)}</h3>
        <h3>Priority: {priority}</h3>
      </div>
    </div>
  );
}
