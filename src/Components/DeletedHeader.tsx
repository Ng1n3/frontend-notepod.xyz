import React from 'react';
import styles from './DeletedHeader.module.css';

interface DeletedHeaderProp {
  option: string;
  setOption: (target: string) => void;
}

export default function DeletedHeader({
  option,
  setOption,
}: DeletedHeaderProp) {
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
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
