import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PasswordsList.module.css';

const password = [
  {
    field: 'Instagram',
    username: 'john123',
    email: 'john@example.com',
    password: '*******',
  },
  {
    field: 'X',
    username: 'john123',
    email: 'john@example.com',
    password: '*******',
  },
  {
    field: 'Telegram',
    username: 'john123',
    email: 'john@example.com',
    password: '*******',
  },
  {
    field: 'Facebook',
    username: 'john123',
    email: 'john@example.com',
    password: '*******',
  },
  {
    field: 'Jira',
    username: 'john123',
    email: 'john@example.com',
    password: '*******',
  },
];

export default function PasswordsList() {
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
          {password.map((entry, index) => (
            <tr key={index}>
              <td>{entry.field}</td>
              <td>
                <div className={styles.copy}>
                  {entry.username}{' '}
                  <span>
                    <FontAwesomeIcon icon={faCopy} className={styles.pics}/>
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.email}{' '}
                  <span>
                    <FontAwesomeIcon icon={faCopy} className={styles.pics}/>
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.password}{' '}
                  <div className={styles.copy2}>
                    <span>
                      <FontAwesomeIcon icon={faCopy} className={styles.pics}/>
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon icon={faPen} className={styles.pics}/>
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon icon={faTrash} className={styles.pics}/>
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
