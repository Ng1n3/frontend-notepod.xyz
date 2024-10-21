import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useTodos from '../context/useTodos';
import styles from './NoteListBody.module.css';
import Spinner from './Spinner';
import TodoListItem from './TodoListItem';

interface TodoListBodyProps {
  searchTerm: string;
}

export default function TodoListBody({ searchTerm }: TodoListBodyProps) {
  const { todos, isLoading } = useTodos();
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);

  if (isLoading) return <Spinner />;

  if (!todos) {
    return (
      <div className={`${styles.result}`}>
        <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
        <p className={styles.p}>No Todos Found 😔</p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.listBody}>
        {todos.length === 0 ? (
          <div className={styles.result}>
            <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
            <p className={styles.p}>
              {searchTerm
                ? 'No results found'
                : 'Sorry, you currently have no todos'}
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoListItem
              key={todo.id ?? 'unkown-id'}
              todo={{ ...todo, id: todo.id ?? 'unkown-id' }}
              showModal={modalOpenId === todo.id}
              setShowModal={(show: boolean) =>
                setModalOpenId(show ? todo.id ?? null : null)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
