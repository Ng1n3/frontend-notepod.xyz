import { useState } from 'react';
import styles from './List.module.css';
import ListHeader from './ListHeader';
import TodoListBody from './TodoListBody';
import useTodos from '../context/useTodos';

export interface ListType {
  type: 'todo' | 'note';
}

export default function ListTodo({ type }: { type: ListType }) {
  const [searchTerm, setSearchTerm] = useState('');
  const {searchTodo} = useTodos()

  const handleSearch = () => {
    if(searchTerm.trim()) {
      searchTodo(searchTerm);
    }
  };

  return (
    <section className={styles.body}>
      <ListHeader
        type={type}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <TodoListBody searchTerm={searchTerm} />
    </section>
  );
}
