import Button from './Button';
import styles from './DeletedHeader.module.css'

export default function DeletedHeader() {
  return (
    <div className={styles.deletedContainer}>
      <select name="" id="" className={styles.select}>
        <option value="note">Notes</option>
        <option value="todo">Todos</option>
        <option value="password">Passwords</option>
      </select>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for your passwords.." />
        <Button>Search</Button>
      </div>
    </div>
  );
}
