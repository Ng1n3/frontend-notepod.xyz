import useNotes from '../context/useNotes';
import styles from './NoteListBody.module.css';
import NoteListItem from './NoteListItem';
import Spinner from './Spinner';

export default function NoteListBody() {
  const {notes, isLoading} = useNotes();
  if(isLoading) return <Spinner/>

  return (
    <>
      <div className={styles.listBody}>
        {notes.map((note) => (
          
          <NoteListItem
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </>
  );
}