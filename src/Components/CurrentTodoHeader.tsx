import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import useTodos from '../hook/useTodos';
import Button from './Button';
import styles from './CurrentTodoHeader.module.css';

const customHeading = Heading.extend({
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
  customHeading.configure({
    levels: [1],
  }),
  Placeholder.configure({
    placeholder: 'Untitled',
    emptyEditorClass: 'is-editor-empty',
  }),
];

const content = '<h1></h1>';

interface currentTodoHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CurrentTodoHeader({
  title,
  setTitle,
  handleSubmit,
}: currentTodoHeaderProps) {
  const { currentTodo } = useTodos();
  const editor = useEditor({
    content,
    extensions,
    onUpdate: ({ editor }) => {
      setTitle(editor.getText());
    },
  });

  useEffect(() => {
    if (editor && currentTodo) {
      editor.commands.setContent(`<h1>${currentTodo.title || ''}</h1>`);
    } else {
      editor?.commands.setContent('<h1></h1>');
    }
  }, [currentTodo, editor]);

  useEffect(() => {
    if (editor && title !== editor.getText()) {
      editor.commands.setContent(`<h1>${title || ''}</h1>`);
    }
  }, [title, editor]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button behavior
    // Create a synthetic form event
    const formEvent = {
      preventDefault: () => e.preventDefault(),
      currentTarget: e.currentTarget.form,
    } as React.FormEvent<HTMLFormElement>;

    handleSubmit(formEvent);
  };

  return (
    <div className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor} />
      <Button onClick={handleClick}>
        {currentTodo ? 'update Todo' : 'Add Todo'}
      </Button>
    </div>
  );
}
