import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNotes } from '../hook/useNotes';
import CurrentNote from './CurrentNote';
import Footer from './Footer';
import List from './List';
import Signin from './Signin';
import styles from './NotesBody.module.css'

const MiniMenu = ({ isCurrentNote, onClick }: { isCurrentNote: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick} className={styles.floating_toggle}>
      {isCurrentNote ? (
        <svg
          className={styles.toggle_icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          className={styles.toggle_icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      )}
    </button>
  );
}

export default function NotesBody() {
  const { currentAuth } = useAuth();
  const { fetchNotes } = useNotes();
  const initialFetchDone = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCurrentNote, setShowCurrentNote] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 600) {
        setShowCurrentNote(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
    }
    fetchNotes();
  }, [fetchNotes]);

  const toggleView = () => {
    setShowCurrentNote(prev => !prev);
  };

  if (!currentAuth) {
    return <Signin destination="notes" />;
  }

  return (
    <>
      {windowWidth > 600 ? (
        <div className={styles.body}>
          <CurrentNote />
          <List type="note" />
        </div>
      ) : (
        <>
          {showCurrentNote ? <CurrentNote /> : <List type="note" />}
          <MiniMenu 
            isCurrentNote={showCurrentNote} 
            onClick={toggleView}
          />
        </>
      )}
      <Footer />
    </>
  );
}
