import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDeleted from '../hook/useDeleted';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import styles from './DeletedPasswordBody.module.css';
import Spinner from './Spinner';

const WORDS_BODY_LIMIT = 10;
const WORDS_HEAD_LIMIT = 3;

export default function DeletedNotesBody() {
  const { deletedNotes, isLoading, restoreDeletedNotes } = useDeleted();
  if (isLoading) return <Spinner />;

  function handleClick(noteId: string) {
    restoreDeletedNotes(noteId);
  }
  // console.log(deletedNotes);
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Notes</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>body</th>
              <th>Deleted Date</th>
            </tr>
          </thead>
          <tbody>
            {deletedNotes.map((deletedNote) => (
              <tr key={deletedNote.id}>
                <td>{shortentext(deletedNote.title, WORDS_HEAD_LIMIT)}</td>
                <td>{shortentext(deletedNote.body, WORDS_BODY_LIMIT)}</td>
                <td className={styles.copy}>
                  {formatDate(deletedNote.deletedAt)}{' '}
                  <span>
                    <FontAwesomeIcon
                      icon={faTrashCanArrowUp}
                      className={styles.pics}
                      onClick={() => handleClick(deletedNote.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
