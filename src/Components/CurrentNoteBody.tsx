import { EditorContent, useEditor } from '@tiptap/react';

// import TextStyle from '@tiptap/extension-text-style';
// import { listItem } from '@tiptap/pm/schema-list';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import LastSaved from './LastSaved';
import MenuBar from './TipTap/MenuBar';

const extensions = [
  // TextStyle.configure({ types: [listItem.name] }),
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

interface CurrentNoteBodyProps {
  body: string;
  setBody: (body: string) => void;
}

export default function CurrentNoteBody({
  body,
  setBody,
}: CurrentNoteBodyProps) {
  const onUpdate = useCallback(
    ({ editor }) => {
      const newBody = editor.getText();
      if (newBody !== body) {
        setBody(newBody);
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
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <LastSaved />
    </>
  );
}

{
  /* <EditorProvider
  slotBefore={<MenuBar />}
  extensions={extensions}
  content={content}
></EditorProvider>
<LastSaved /> */
}
