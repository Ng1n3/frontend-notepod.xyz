import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Button from './Button';
import styles from './CurrentNoteHeader.module.css';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Untitled',
    emptyEditorClass: 'is-editor-empty',
  }),
];
const content = `<h1></h1>`;

export default function CurrentNoteHeader({ setTitle}) {
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({editor}) => {
      setTitle(editor.getText())
    }
  });

  return (
    <header className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor} />
      <Button>Add Note</Button>
    </header>
  );
}
