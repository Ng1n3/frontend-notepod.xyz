import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import useNotes from '../context/useNotes';
import Button from './Button';
import styles from './CurrentNoteHeader.module.css';

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1],
    },
  }),
  Placeholder.configure({
    placeholder: 'Untitled',
    emptyEditorClass: 'is-editor-empty',
  }),
];
const content = `<h1></h1>`;

export default function CurrentNoteHeader({ setTitle, handleSubmit }) {
  const { currentNote } = useNotes();
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => {
      setTitle(editor.getText());
    },
  });

  useEffect(
    function () {
      if (editor && currentNote) {
        editor.commands.setContent('');
        editor.commands.setHeading({ level: 1 });
        editor.commands.insertContent(currentNote.title || '');
      }
    },
    [currentNote, editor]
  );

  return (
    <header className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor} />
      <Button onClick={handleSubmit}>
        {currentNote ? 'Update Note' : 'Add Note'}
      </Button>
    </header>
  );
}
