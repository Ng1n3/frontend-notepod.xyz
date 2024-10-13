import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CurrentTodoBody.module.css';
import MenuBar from './TipTap/MenuBar';
import { Editor } from '@tiptap/react';

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

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

interface CurrentTodoBodyProp {
  body: string;
  dueDate: Date;
  setDueDate: React.Dispatch<React.SetStateAction<Date>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  setPriority: (newPriority: keyof typeof Priority) => void;
  priority: Priority;
}

export default function CurrentTodoBody({
  setBody,
  body,
  dueDate,
  setDueDate,
  setPriority,
}: CurrentTodoBodyProp) {
  const onUpdate = useCallback(
    ({ editor }: {editor: Editor}) => {
      const newDescription = editor.getText();
      if (newDescription !== body) {
        setBody(newDescription);
      }
    },
    [setBody, body]
  );

  const editor = useEditor({
    extensions,
    content: '',
    onUpdate,
  });

  useEffect(
    function () {
      if (editor && body !== editor.getText()) {
        editor.commands.setContent('');
        editor.commands.insertContent(body);
      }
    },
    [body, editor]
  );

  return (
    <div className={styles.currentTodoBodyContainer}>
      <MenuBar editor={editor} />
      <header>
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            onChange={(e) =>
              setPriority(e.target.value as keyof typeof Priority)
            }
          >
            <option value={Priority.LOW}>LOW</option>
            <option value={Priority.MEDIUM}>MEDIUM</option>
            <option value={Priority.HIGH}>HIGH</option>
            <option value={Priority.CRITICAL}>CRITICAL</option>
          </select>
        </div>
        <DatePicker
          id="date"
          onChange={(date) => setDueDate(date ?? new Date())}
          selected={dueDate}
          dateFormat="dd/MM/yyyy"
        />
      </header>
      <EditorContent editor={editor} />
    </div>
  );
}
