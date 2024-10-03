import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePasswords from '../context/usePassword';
import styles from './PasswordsList.module.css';
import Spinner from './Spinner';

export default function PasswordsList() {
  const { passwords, isLoading, error } = usePasswords();

  // console.log("Passwords from list: ", passwords);

  if (isLoading) return <Spinner />;

  if (error) return <div>Error: ${error}</div>;

  if (!passwords || passwords.length === 0) {
    return <div>No passwords found.</div>;
  }
  return (
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
          {passwords.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.fieldname}</td>
              <td>
                <div className={styles.copy}>
                  {entry.username}{' '}
                  <span>
                    <FontAwesomeIcon icon={faCopy} className={styles.pics} />
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.email}{' '}
                  <span>
                    <FontAwesomeIcon icon={faCopy} className={styles.pics} />
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.password}{' '}
                  <div className={styles.copy2}>
                    <span>
                      <FontAwesomeIcon icon={faCopy} className={styles.pics} />
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon icon={faPen} className={styles.pics} />
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon icon={faTrash} className={styles.pics} />
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
