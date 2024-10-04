import { useState } from 'react';
import useNotes from '../context/useNotes';
import styles from './NoteListBody.module.css';
import NoteListItem from './NoteListItem';
import Spinner from './Spinner';

export default function NoteListBody() {
  const { notes, isLoading, fetchNote } = useNotes();
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className={styles.listBody}>
        {notes &&
          notes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              showModal={modalOpenId === note.id}
              setShowModal={(show: boolean) =>
                setModalOpenId(show ? note.id : null)
              }
              fetchNote={fetchNote}
            />
          ))}
      </div>
    </>
  );
}
