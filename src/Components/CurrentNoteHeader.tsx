import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import useNotes from '../context/useNotes';
import Button from './Button';
import styles from './CurrentNoteHeader.module.css';

//creating a custom header to fix backspace bug.
const CustomHeading = Heading.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        if (
          editor.state.selection.$anchor.pos === 1 &&
          editor.state.doc.textContent === ''
        ) {
          return true;
        }
        return false;
      },
    };
  },
});

const extensions = [
  StarterKit.configure({
    heading: false,
  }),
  CustomHeading.configure({
    levels: [1],
  }),
  Placeholder.configure({
    placeholder: 'Untitled',
    emptyEditorClass: 'is-editor-empty',
  }),
];
const content = `<h1></h1>`;

interface currentNoteHeaderProps {
  setTitle: (title: string) => void;
  handleSubmit: () => void;
}

export default function CurrentNoteHeader({
  setTitle,
  handleSubmit,
}: currentNoteHeaderProps) {
  const { currentNote } = useNotes();
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => {
      setTitle(editor.getText());
    },
  });

  useEffect(() => {
    if (editor && currentNote) {
      editor.commands.setContent(`<h1>${currentNote.title || ''}</h1>`);
    } else {
      editor?.commands.setContent('<h1></h1>');
    }
  }, [currentNote, editor]);

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
