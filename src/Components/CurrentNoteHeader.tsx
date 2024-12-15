import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import useNotes from '../hook/useNotes';
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
  title: string;
  setTitle: (title: string) => void;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function CurrentNoteHeader({
  title,
  setTitle,
  onSave,
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
    if (editor) {
      if (currentNote) {
        editor.commands.setContent(`<h1>${currentNote.title || ''}</h1>`);
      } else {
        editor?.commands.setContent('<h1></h1>');
      }
    }
  }, [currentNote, editor]);

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
    
    onSave(formEvent);
  };

  return (
    <header className={styles.title}>
      {/* <h1>Title</h1> */}
      <EditorContent editor={editor} />
      <Button onClick={handleClick}>
        {currentNote && currentNote.id ? 'Update Note' : 'Add Note'}
      </Button>
    </header>
  );
}
