import Button from "./Button";
import styles from './ListHeader.module.css'

export default function ListHeader() {
  return (
    <header className={styles.header}>
      <input type="text" placeholder="Search for your notes..." />
      <Button>Search</Button>
    </header>
  )
}
