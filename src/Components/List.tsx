import styles from './List.module.css';
import ListHeader from './ListHeader';
import NoteListBody from './NoteListBody';

export default function List() {
  return (
    <section className={styles.body}>
      <ListHeader />
      <NoteListBody />
    </section>
  );
}
