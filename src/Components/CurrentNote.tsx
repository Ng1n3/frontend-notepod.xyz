import React, { useState } from 'react';
import useNotes from '../context/useNotes';
import styles from './CurrentNote.module.css';
import CurrentNoteBody from './CurrentNoteBody';
import CurrentNoteHeader from './CurrentNoteHeader';

export default function CurrentNote() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { createNote, currentNote } = useNotes();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;

    
    interface newNoteProp {
      id: number;
      title: string;
      body: string;
      lastChecked: Date;
    }
    
    const newNote: newNoteProp = {
      id: 0,
      title,
      body,
      lastChecked: new Date(),
    };
    if(currentNote?.title === title) return
    await createNote(newNote);
    setTitle('');
    setBody('');
  }
  
  return (
    <section className={styles.note}>
      <form>
        <CurrentNoteHeader
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
        />
        <CurrentNoteBody body={body} setBody={setBody} />
      </form>
    </section>
  );
}
