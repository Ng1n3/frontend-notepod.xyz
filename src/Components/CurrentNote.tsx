import CurrentNoteHeader from './CurrentNoteHeader'
import CurrentNoteBody from './CurrentNoteBody'
import styles from './CurrentNote.module.css'

export default function CurrentNote() {
  return (
    <div className={styles.note}>
      <CurrentNoteHeader/>
      <CurrentNoteBody/>
    </div>
  )
}
