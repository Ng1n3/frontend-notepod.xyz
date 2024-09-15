import CurrentNote from './CurrentNote'
import NoteList from './NoteList'
import styles from './NoteBody.module.css'

export default function NotesBody() {
  return (
    <div className={styles.body}>
      <CurrentNote/>
      <NoteList/>
    </div> 
  )
}
