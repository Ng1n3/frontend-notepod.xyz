import Button from './Button';
import styles from './PasswordInput.module.css';

export default function PasswordInput() {
  return (
    <div className={styles.passwordBody}>
      <header className={styles.header}>
        <h1>Create a Password</h1>
        <Button>Add Password</Button>
      </header>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="field name" />
        <input type="text" placeholder="username/email" />
        <input type="text" placeholder="password/keys" />
      </div>
    </div>
  );
}
