import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import useTodos from '../context/useTodos';
import Button from './Button';
import styles from './CurrentTodoHeader.module.css';

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

const content = '<h1></h1>'

export default function CurrentTodoHeader({ setTitle, handleSubmit }) {
  const { currentTodo } = useTodos();
  // console.log("current todo from the currenttodoheader", currentTodo);
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => {
      setTitle(editor.getText());
    },
  });

  useEffect(
    function () {
      if (editor && currentTodo) {
        editor.commands.setContent(``);
        editor.commands.setHeading({ level: 1 });
        editor.commands.insertContent(currentTodo.title || '');
      } else {
        // console.log(editor);
        editor?.commands.clearContent();
      }
  },
    [currentTodo, editor]
  );

  // useEffect(() => {
  //   if(editor && task !== editor.getText())
  //     editor.commands.setContent(`<h1>${task}</h1>`)
  // }, [editor, task])
  return (
    <div className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor} />
      <Button onClick={handleSubmit}>
        {currentTodo ? 'update Todo' : 'Add Todo'}
      </Button>
    </div>
  );
}
