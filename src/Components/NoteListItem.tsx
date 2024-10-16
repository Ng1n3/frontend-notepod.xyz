import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useNotes from '../context/useNotes';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import style from './NoteListItem.module.css';
import VerifyDelete from './VerifyDelete';

interface NoteListItem {
  id: string | undefined;
  title: string;
  body: string;
  updatedAt?: Date;
  userId: string;
}

interface NoteListItemProp {
  note: NoteListItem;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  fetchNote: (id: string) => Promise<void>;
}

const BODY_TEXT_NUM = 15;
const HEADING_TEXT_NUM = 3;

export default function NoteListItem({
  note,
  showModal,
  setShowModal,
}: NoteListItemProp) {
  const { id, title, body, updatedAt } = note;
  const { setCurrentNote } = useNotes();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    setShowModal(true);
  }

  function handleNoteClick() {
    setCurrentNote(note);
  }

  return (
    <div className={style.body}>
      {showModal ? (
        <VerifyDelete
          id={id!}
          onClose={() => setShowModal(false)}
          itemType="note"
        />
      ) : (
        <div onClick={handleNoteClick}>
          <header className={style.header}>
            <h2>{shortentext(title, HEADING_TEXT_NUM)}</h2>
            {/* <h2>{title}</h2> */}
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              color="#EC7A7C"
              onClick={handleClick}
              className={style.icon}
            />
          </header>
          <p>{shortentext(body, BODY_TEXT_NUM)}</p>
          {updatedAt && <p>Last Updated: {formatDate(updatedAt)}</p>}
        </div>
      )}
    </div>
  );
}
