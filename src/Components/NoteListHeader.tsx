import Button from "./Button";
import styles from './NoteListHeader.module.css'

export default function NoteListHeader() {
  return (
    <div className={styles.header}>
      <input type="text" placeholder="Search for your notes..." />
      <Button>Search</Button>
    </div>
  )
}
