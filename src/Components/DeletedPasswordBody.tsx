import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedPasswordBody.module.css';

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

export default function DeletedPasswordBody() {
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
            {password.map((entry, index) => (
              <tr key={index}>
                <td>{entry.field}</td>
                <td>{entry.username} </td>
                <td>{entry.email} </td>
                <td className={styles.copy}>
                  {entry.password}
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
