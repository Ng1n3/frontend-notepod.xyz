import {
  faBold,
  faItalic,
  faListOl,
  faListUl,
  faParagraph,
  faStrikethrough,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import styles from './MenuBar.module.css';

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strike: false,
    paragraph: false,
    h1: false,
    h2: false,
    h3: false,
    orderedList: false,
    bulletList: false,
  });

  useEffect(() => {
    if (!editor) return; // Early return if editor is null

    const updateActiveFormats = () => {
      const formats = {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        strike: editor.isActive('strike'),
        paragraph: editor.isActive('paragraph'),
        h1: editor.isActive('heading', { level: 1 }),
        h2: editor.isActive('heading', { level: 2 }),
        h3: editor.isActive('heading', { level: 3 }),
        orderedList: editor.isActive('orderedList'),
        bulletList: editor.isActive('bulletList'),
      };
      setActiveFormats(formats);
    };

    editor.on('update', updateActiveFormats);
    updateActiveFormats(); // Set initial state

    return () => {
      editor.off('update', updateActiveFormats);
    };
  }, [editor]);

  if (!editor) return null; // Return null if editor is null

  return (
    <div className={styles.controlGroup}>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={activeFormats.bold ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={activeFormats.italic ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={activeFormats.strike ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={activeFormats.paragraph ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={activeFormats.h1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={activeFormats.h2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={activeFormats.h3 ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={activeFormats.orderedList ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={activeFormats.bulletList ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>
    </div>
  );
}
