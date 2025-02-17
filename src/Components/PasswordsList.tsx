import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Password } from '../context/passwordContext';
import usePasswords from '../hook/usePassword';
import styles from './PasswordsList.module.css';
import Spinner from './Spinner';

function PasswordsList() {
  const {
    passwords,
    isLoading,
    error,
    setCurrentPassword,
    deletePassword,
    fetchPasswords,
  } = usePasswords();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  const handleEditing = function (password: Password) {
    setCurrentPassword(password);
  };

  function handleDeleting(id: string) {
    deletePassword(id);
  }

  function handleCopy(text: string, entryId: string, field: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedField(`${entryId}-${field}`);
        setTimeout(() => setCopiedField(null), 2000);
      },
      (err) => {
        console.error('Failde to copy', err);
      }
    );
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
                  <span
                    onClick={() =>
                      handleCopy(entry.username!, entry.id!, 'username')
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        copiedField === `${entry.id}-username`
                          ? faCheck
                          : faCopy
                      }
                      className={styles.pics}
                    />
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.email}{' '}
                  <span
                    onClick={() => handleCopy(entry.email!, entry.id!, 'email')}
                  >
                    <FontAwesomeIcon
                      icon={
                        copiedField === `${entry.id}-email` ? faCheck : faCopy
                      }
                      className={styles.pics}
                    />
                  </span>
                </div>
              </td>
              <td>
                <div className={styles.copy}>
                  {entry.password}{' '}
                  <div className={styles.copy2}>
                    <span
                      onClick={() =>
                        handleCopy(entry.password, entry.id!, 'password')
                      }
                    >
                      <FontAwesomeIcon
                        icon={
                          copiedField === `${entry.id}-password`
                            ? faCheck
                            : faCopy
                        }
                        className={styles.pics}
                      />
                    </span>{' '}
                    <span onClick={() => handleEditing(entry)}>
                      <FontAwesomeIcon icon={faPen} className={styles.pics} />
                    </span>{' '}
                    <span>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.pics}
                        onClick={() => handleDeleting(entry.id!)}
                      />
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
