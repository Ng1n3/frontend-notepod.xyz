import Header from '../Components/Header';
import NotesBody from '../Components/NotesBody';
import styles from './Notes.module.css'

export default function Notes() {
  return (
    <div className={styles.notes}>
      <Header/>
      <NotesBody/>
    </div>
  );
}
