// import { useCurrentEditor } from '@tiptap/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic,  faListOl,  faListUl, faParagraph, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tiptap/react';

import styles from './MenuBar.module.css';

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({editor}: MenuBarProps) {
  // const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <div className={styles.controlGroup}>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faBold}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faItalic}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faStrikethrough}/>
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faParagraph}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListUl}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>
    </div>
  );
}
