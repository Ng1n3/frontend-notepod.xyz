import { useState } from 'react';
import styles from './List.module.css';
import ListHeader from './ListHeader';
import { ListType } from './ListTodo';
import NoteListBody from './NoteListBody';

export default function List({ type }: { type: ListType }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className={styles.body}>
      <ListHeader
        type={type}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <NoteListBody searchTerm={searchTerm} />
    </section>
  );
}
