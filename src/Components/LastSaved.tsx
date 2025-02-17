import {useNotes} from '../hook/useNotes';
import { formatDate } from '../util/formatDate';
import styles from './LastSaved.module.css';

export default function LastSaved() {
  const { currentNote } = useNotes();
  return (
    <p className={styles.paragraph}>
      {currentNote && (
        <>
          <strong>Last updated: </strong>
          <span>
            <em>{formatDate(currentNote.updatedAt)}</em>
          </span>
        </>
      )}
    </p>
  );
}
