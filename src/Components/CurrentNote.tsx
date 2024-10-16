import { useCallback, useEffect, useState } from 'react';
import useAuth from '../context/useAuth';
import useNotes from '../context/useNotes';
import useSafeNavigate from '../hook/useSafeNavigate';
import { createNoteSchema } from '../util/types';
import styles from './CurrentNote.module.css';
import CurrentNoteBody from './CurrentNoteBody';
import CurrentNoteHeader from './CurrentNoteHeader';

export default function CurrentNote() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { createNote, currentNote, updateNote, clearCurrentNote } = useNotes();
  const { currentAuth } = useAuth();

  const navigate = useSafeNavigate();
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

  const handleSubmit = useCallback(async () => {
    if (!title) return;

    const validation = createNoteSchema.safeParse({ title, body });
    if (!validation.success) {
      console.error(validation.error);
      return;
    }

    if (currentNote && currentNote.id) {
      await updateNote({
        title,
        body,
        id: currentNote.id,
        updatedAt: new Date(),
        userId: currentAuth?.id,
      });
      clearCurrentNote();
    } else {
      await createNote({ title, body, userId: currentAuth?.id });
      clearCurrentNote();
    }

    setTitle('');
    setBody('');

    if (currentNote?.title === title) return;
    navigate('/');
  }, [
    title,
    body,
    currentNote,
    updateNote,
    createNote,
    navigate,
    clearCurrentNote,
    currentAuth,
  ]);

  return (
    <section className={styles.note}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
