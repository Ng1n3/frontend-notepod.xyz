import useNotes from '../context/useNotes';
import CurrentNote from './CurrentNote';
import Footer from './Footer';
import List from './List';
import styles from './NoteBody.module.css';
import Signup from './Signup';

export default function NotesBody() {
  const { currentNote } = useNotes();

  return (
    <>
      <div className={styles.body}>
        <CurrentNote />
        {currentNote ? <List /> : <Signup />}
      </div>
      <Footer />
    </>
  );
}