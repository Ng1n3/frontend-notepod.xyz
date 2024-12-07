import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDeleted from '../hook/useDeleted';
import styles from './DeletedPasswordBody.module.css';
import Spinner from './Spinner';

export default function DeletedPasswordBody() {
  const { deletedPasswords, isLoading, restoreDeletedPassword } = useDeleted();
  if (isLoading) return <Spinner />;
  function handleClick(passwordId: string) {
    restoreDeletedPassword(passwordId);
  }
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Passwords</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Username</th>
              <th>Email</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {deletedPasswords.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.fieldname}</td>
                <td>{entry.username} </td>
                <td>{entry.email} </td>
                <td className={styles.copy}>
                  {entry.password}
                  <span>
                    <FontAwesomeIcon
                      onClick={() => handleClick(entry.id)}
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
