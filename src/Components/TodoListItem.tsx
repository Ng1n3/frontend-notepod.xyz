import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NoteListItem.module.css'

interface TodoListItemProp {
  task: string;
  description: string;
  priority: string;
  dueDate: string;
  deletedDate?: string;
}

export default function TodoListItem({
  task,
  description,
  priority,
  dueDate,
  deletedDate,
}: TodoListItemProp) {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h2>{task}</h2>
        <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#EC7A7C" />
      </header>
      <p>
        <span>{description}</span>
        {deletedDate}
      </p>
      <div className={styles.h3s}>
      <h3>Due date: {dueDate}</h3>
        
      <h3>Priority: {priority}</h3>
      </div>
    </div>
  );
}
