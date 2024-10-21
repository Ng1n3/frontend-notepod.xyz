import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import useTodos from '../context/useTodos';
import styles from './NoteListBody.module.css';
import Spinner from './Spinner';
import TodoListItem from './TodoListItem';

export interface ListBodyProps {
  searchTerm: string;
}

export default function TodoListBody({ searchTerm }: ListBodyProps) {
  const { todos, isLoading } = useTodos();
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);
  const [filteredTodos, setFilteredTodos] = useState(todos || []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredTodos(
        todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredTodos(todos);
    }
  }, [searchTerm, todos]);

  if (isLoading) return <Spinner />;

  if (!filteredTodos || filteredTodos.length === 0) {
    return (
      <div className={`${styles.result}`}>
        <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
        <p className={styles.p}>
          {searchTerm
            ? 'No results found 😔'
            : 'Sorry, you currently have no todos'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.listBody}>
        {filteredTodos.map((todo) => (
          <TodoListItem
            key={todo.id ?? 'unknown-id'}
            todo={{ ...todo, id: todo.id ?? 'unknown-id' }}
            showModal={modalOpenId === todo.id}
            setShowModal={(show: boolean) =>
              setModalOpenId(show ? todo.id ?? null : null)
            }
          />
        ))}
      </div>
    </div>
  );
}
