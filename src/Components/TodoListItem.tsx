import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useTodos from '../context/useTodos';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import styles from './NoteListItem.module.css';
import VerifyDelete from './VerifyDelete';

enum Priority {
  LOW ='LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
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
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const TODO_HEADER_NUM = 3;
const TODO_BODY_NUM = 15;

export default function TodoListItem({
  todo,
  showModal,
  setShowModal,
}: TodoListItemProp) {
  const { id, title, body, dueDate, priority } = todo;
  const { setCurrentTodo } = useTodos();
  function handleTodoClick() {
    setCurrentTodo({ title,  body, priority, id, dueDate });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setShowModal(true);
  }
  return (
    <div className={styles.body} onClick={handleTodoClick}>
      {showModal ? (
        <VerifyDelete id={id} onClose={() => setShowModal(false)} itemType='todo'/>
      ) : (
        <>
          <header className={styles.header}>
            <h2>{shortentext(title, TODO_HEADER_NUM)}</h2>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              color="#EC7A7C"
              onClick={handleDelete}
            />
          </header>
          <p>
            <span>{shortentext(body, TODO_BODY_NUM)}</span>
          </p>
          <div className={styles.h3s}>
            <h3>Due date: {formatDate(dueDate)}</h3>
            <h3>Priority: {priority}</h3>
          </div>
        </>
      )}
    </div>
  );
}
