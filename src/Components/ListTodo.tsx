import { useState } from 'react';
import styles from './List.module.css';
import ListHeader from './ListHeader';
import TodoListBody from './TodoListBody';

export type ListType = 'todo' | 'note';

export default function ListTodo({ type }: { type: ListType }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className={styles.body}>
      <ListHeader
        type={type}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <TodoListBody searchTerm={searchTerm} />
    </section>
  );
}