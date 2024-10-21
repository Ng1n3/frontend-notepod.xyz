import { useState } from 'react';
import styles from './List.module.css';
import ListHeader from './ListHeader';
import { ListType } from './ListTodo';
import NoteListBody from './NoteListBody';

export default function List({ type }: { type: ListType }) {
  const { searchTerm, setSearchTerm } = useState('');

  const handleSearch = () => {
    console.log('I am handling serach');
  };

  return (
    <section className={styles.body}>
      <ListHeader
        type={type}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <NoteListBody searchTerm={searchTerm} />
    </section>
  );
}
