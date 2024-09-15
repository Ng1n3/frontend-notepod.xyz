import NoteListBody from "./NoteListBody";
import NoteListHeader from "./NoteListHeader";
import styles from './NoteList.module.css'

export default function NoteList() {
  return (
    <div className={styles.body}>
      <NoteListHeader/>
      <NoteListBody/>
    </div>
  )
}
