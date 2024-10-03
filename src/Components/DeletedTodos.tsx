import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedPasswordBody.module.css';
import useDeleted from '../context/useDeleted';
import Spinner from './Spinner';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';

const WORDS_BODY_LIMIT = 10;
const WORDS_HEAD_LIMIT = 3;

export default function DeletedTodos() {
  const {deletedTodos, isLoading} = useDeleted()

  // console.log("deleted Todos: ", deletedTodos);
  if(isLoading)return <Spinner/>
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Todos</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {deletedTodos.map((entry) => (
              <tr key={entry.id}>
                <td>{shortentext(entry.title, WORDS_HEAD_LIMIT)}</td>
                <td>{shortentext(entry.body, WORDS_BODY_LIMIT)} </td>
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
