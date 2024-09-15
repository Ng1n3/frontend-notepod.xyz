import Button from './Button'
import styles from './CurrentNoteHeader.module.css'

export default function CurrentNoteHeader() {
  return (
    <header className={styles.title}>
      <h1>Title</h1>
      <Button>Add Note</Button>
    </header>
  )
}
