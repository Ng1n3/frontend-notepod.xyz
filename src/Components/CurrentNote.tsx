import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import {useNotes} from '../hook/useNotes';
import { createNoteSchema, updateNoteSchema } from '../util/types';
import styles from './CurrentNote.module.css';
import CurrentNoteBody from './CurrentNoteBody';
import CurrentNoteHeader from './CurrentNoteHeader';

export default function CurrentNote() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { createNote, currentNote, updateNote } = useNotes();
  const { currentAuth } = useAuth();

  useEffect(
    function () {
      if (currentNote) {
        setTitle(currentNote.title || '');
        setBody(currentNote.body || '');
      } else {
        setTitle('');
        setBody('');
      }
    },
    [currentNote]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!title || !currentAuth) return;

      const userId = currentAuth.id ?? '';

      if (currentNote && currentNote.id) {
        const validation = updateNoteSchema.safeParse({ title, body });
        if (!validation.success) {
          console.error(validation.error);
          return;
        }

        await updateNote({
          title,
          body,
          id: currentNote.id,
          updatedAt: new Date(),
          userId,
        });
      } else {
        const validation = createNoteSchema.safeParse({ title, body });
        if (!validation.success) {
          console.error(validation.error);
          return;
        }
        await createNote({ title, body, userId });
      }
      setTitle('');
      setBody('');
    },
    [title, body, currentNote, updateNote, createNote, currentAuth]
  );

  return (
    <section className={styles.note}>
      <form>
        <CurrentNoteHeader
          title={title}
          setTitle={setTitle}
          onSave={handleSubmit}
        />
        <CurrentNoteBody body={body} setBody={setBody} />
      </form>
    </section>
  );
}
