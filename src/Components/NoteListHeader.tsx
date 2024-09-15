import Button from "./Button";
import styles from './NoteListHeader.module.css'

export default function NoteListHeader() {
  return (
    <header className={styles.header}>
      <input type="text" placeholder="Search for your notes..." />
      <Button>Search</Button>
    </header>
  )
}
