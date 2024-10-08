import CurrentNote from './CurrentNote';
import Footer from './Footer';
import List from './List';
import styles from './NoteBody.module.css';

export default function NotesBody() {
  return (
    <>
      <div className={styles.body}>
        <CurrentNote />
        <List />
      </div>
      <Footer />
    </>
  );
}
