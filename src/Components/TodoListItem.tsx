import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import styles from './NoteListItem.module.css';

interface TodoListItem {
  title: string;
  body: string;
  priority: string;
  dueDate: Date;
  // deletedDate?: string;
}

interface TodoListItemProp {
  todo: TodoListItem
}

const TODO_HEADER_NUM = 3;
const TODO_BODY_NUM = 15;

export default function TodoListItem({ todo }: TodoListItemProp) {
  const { title, body, dueDate, priority } = todo;
  return (
    <div className={styles.body}>
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
