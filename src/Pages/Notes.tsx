import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import NotesBody from '../Components/NotesBody';
import useNotes from '../context/useNotes';
import styles from './Notes.module.css';

export default function Notes() {
  const { id } = useParams();
  const { fetchNote, setCurrentNote } = useNotes();
  useEffect(
    function () {
      if (id) {
        fetchNote(id);
      } else {
        setCurrentNote(null);
      }
    },
    [id]
  );
  return (
    <div className={styles.notes}>
      <Header />
      <NotesBody />
    </div>
  );
}
