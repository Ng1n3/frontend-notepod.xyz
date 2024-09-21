import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedPasswordBody.module.css';
import useDeleted from '../context/useDeleted';
import Spinner from './Spinner';
import { formatDate } from '../util/formatDate';

const WORDS_BODY_LIMIT = 10;
const WORDS_HEAD_LIMIT = 3;

function shortentext(text: string, wordsLimit: number) {
  const words = text.split(' ');
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...';
  }
  return text;
}


export default function DeletedTodos() {
  const {deletedTodos, isLoading} = useDeleted()
  if(isLoading)return <Spinner/>
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Todos</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Descriptoin</th>
              <th>Priority</th>
              <th>deletedDate</th>
            </tr>
          </thead>
          <tbody>
            {deletedTodos.map((entry) => (
              <tr key={entry.id}>
                <td>{shortentext(entry.task, WORDS_HEAD_LIMIT)}</td>
                <td>{shortentext(entry.description, WORDS_BODY_LIMIT)} </td>
                <td>{entry.priority} </td>
                <td className={styles.copy}>
                  {formatDate(entry.dueDate)}
                  <span>
                    <FontAwesomeIcon
                      icon={faTrashCanArrowUp}
                      className={styles.pics}
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
