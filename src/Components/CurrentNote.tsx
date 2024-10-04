import React, { useCallback, useEffect, useState } from 'react';
import useNotes from '../context/useNotes';
import styles from './CurrentNote.module.css';
import CurrentNoteBody from './CurrentNoteBody';
import CurrentNoteHeader from './CurrentNoteHeader';

export default function CurrentNote() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { createNote, currentNote, updateNote } = useNotes();
  // interface newNoteProp {
  //   id?: string;
  //   title: string;
  //   body: string;
  //   lastChecked: Date;
  // }

  // const newNote: newNoteProp = {
  //   title,
  //   body,
  //   lastChecked: new Date(),
  // };

  useEffect(
    function () {
      if (currentNote) {
        setTitle(currentNote.title);
        setBody(currentNote.body);
      } else {
        setTitle('');
        setBody('');
      }
    },
    [currentNote]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) return;

      if (currentNote) {
        await updateNote({ ...currentNote, title, body });
      } else {
        await createNote({ title, body });
      }

      // if (currentNote?.title === title) return;
    },
    [title, body, currentNote, updateNote, createNote]
  );

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
