import Button from './Button';
import styles from './CurrentTodoHeader.module.css'

export default function CurrentTodoHeader() {
  return (
    <div className={styles.title}>
      <h1>Title</h1>
      <Button>Add Note</Button>
    </div>
  )
}
