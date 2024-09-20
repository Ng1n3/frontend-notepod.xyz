import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import styles from './CurrentTodoHeader.module.css'
import Button from './Button';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Untitled',
    emptyEditorClass: 'is-editor-empty',
  }),
];
const content = `<h1></h1>`;

export default function CurrentTodoHeader({setTask, handleSubmit}) {
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({editor}) => {
      setTask(editor.getText())
    }
  });
  return (
    <div className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor}/>
      <Button onClick={handleSubmit}>Add Todo</Button>
    </div>
  )
}