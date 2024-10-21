import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import useNotes from '../context/useNotes';
import styles from './NoteListBody.module.css';
import NoteListItem from './NoteListItem';
import Spinner from './Spinner';
import { ListBodyProps } from './TodoListBody';

export default function NoteListBody({ searchTerm }: ListBodyProps) {
  const { notes, isLoading } = useNotes();
  const [modalOpenId, setModalOpenId] = useState<string | null>(null);
  const [filteredNotes, setFilteredNotes] = useState(notes || []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(notes);
    }
  }, [searchTerm, notes]);

  if (isLoading) return <Spinner />;

  if (!filteredNotes || filteredNotes.length === 0) {
    return (
      <div className={`${styles.result}`}>
        <FontAwesomeIcon icon={faBoxOpen} className={styles.icon} />
        <p className={styles.p}>
          {searchTerm
            ? 'No results found 😔'
            : 'Sorry, you currently have no notes'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.listBody}>
        {filteredNotes.map((note) => (
          <NoteListItem
            key={note.id ?? 'unkown-id'}
            note={{ ...note, id: note.id ?? 'unkown-id' }}
            showModal={modalOpenId === note.id}
            setShowModal={(show: boolean) =>
              setModalOpenId(show ? note.id ?? null : null)
            }
          />
        ))}
      </div>
    </>
  );
}
