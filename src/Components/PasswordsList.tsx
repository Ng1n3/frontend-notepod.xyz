import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Password } from '../context/PasswordContext';
import usePasswords from '../context/usePassword';
import styles from './PasswordsList.module.css';
import Spinner from './Spinner';

function PasswordsList() {
  const { passwords, isLoading, error, setCurrentPassword, deletePassword } =
    usePasswords();
  const handleEditing = function (password: Password) {
    setCurrentPassword(password);
  };

  function handleDeleting(id: string) {
    deletePassword(id);
  }

  if (isLoading) return <Spinner />;

  if (error) return <div>Error: {error}</div>;

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
                    <span onClick={() => handleEditing(entry)}>
                      <FontAwesomeIcon icon={faPen} className={styles.pics} />
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon icon={faTrash} className={styles.pics} onClick={() => handleDeleting(entry.id)}/>
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

export default React.memo(PasswordsList);
