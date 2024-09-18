import { EditorContent, useEditor } from '@tiptap/react';

// import TextStyle from '@tiptap/extension-text-style';
// import { listItem } from '@tiptap/pm/schema-list';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './TipTap/MenuBar';
import LastSaved from './LastSaved';

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
const content = `<p></p>`;

export default function CurrentNoteBody({ body, setBody }) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      setBody(editor.getText());
    },
  });

  console.log(body);
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
