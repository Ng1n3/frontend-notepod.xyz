import CurrentNoteHeader from './CurrentNoteHeader'
import CurrentNoteBody from './CurrentNoteBody'
import styles from './CurrentNote.module.css'
import { useState } from 'react'

export default function CurrentNote() {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  return (
    <section className={styles.note}>
      <CurrentNoteHeader title={title} setTitle={setTitle}/>
      <CurrentNoteBody body={body} setBody={setBody}/>
    </section>
  )
}
