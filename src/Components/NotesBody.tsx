import { useEffect, useRef } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNotes } from '../hook/useNotes';
import CurrentNote from './CurrentNote';
import Footer from './Footer';
import List from './List';
import styles from './NoteBody.module.css';
import Signin from './Signin';

export default function NotesBody() {
  const { currentAuth } = useAuth();
  const { fetchNotes } = useNotes();
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
    }
    fetchNotes();
  }, [fetchNotes]);

  return (
    <>
      <div className={styles.body}>
        <CurrentNote />
        {currentAuth ? <List type="note" /> : <Signin destination="notes" />}
      </div>
      <Footer />
    </>
  );
}
