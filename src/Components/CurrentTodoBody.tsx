import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CurrentTodoBody.module.css';
import MenuBar from './TipTap/MenuBar';

const extensions = [
  Placeholder.configure({
    placeholder: 'Start writing here ...',
    emptyEditorClass: 'is-editor-empty',
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

// const content = `<p></p>`;

export default function CurrentTodoBody({
  setDescription,
  description,
  date,
  setDate,
  setOption,
}) {
  const onUpdate = useCallback(
    ({ editor }) => {
      const newDescription = editor.getText();
      if (newDescription !== description) {
        setDescription(newDescription);
      }
    },
    [setDescription, description]
  );

  const editor = useEditor({
    extensions,
    content: '',
    onUpdate,
  });

  useEffect(
    function () {
      if (editor && description !== editor.getText()) {
        editor.commands.setContent('');
        editor.commands.insertContent(description);
      }
    },
    [description, editor]
  );
  
  return (
    <div className={styles.currentTodoBodyContainer}>
      <MenuBar editor={editor} />
      <header>
        <div>
          <label htmlFor="priority">Priority</label>
          <select onChange={(e) => setOption(e.target.value)}>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date ?? new Date())}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </header>
      <EditorContent editor={editor} />
    </div>
  );
}
