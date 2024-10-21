import styles from './DeletedHeader.module.css';

export default function DeletedHeader({ option, setOption }) {
  function handleSelectChange(e) {
    setOption(e.target.value);
  }

  return (
    <div className={styles.deletedContainer}>
      <select
        value={option}
        className={styles.select}
        onChange={handleSelectChange}
      >
        <option value="note">Notes</option>
        <option value="todo">Todos</option>
        <option value="password">Passwords</option>
      </select>
      {/* <div className={styles.searchBar}>
        <input type="text" placeholder={`Search for your ${option}..`} />
        <Button>Search</Button>
      </div> */}
    </div>
  );
}
