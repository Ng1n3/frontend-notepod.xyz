import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../util/formatDate';
import { shortentext } from '../util/shortenText';
import style from './NoteListItem.module.css';
import VerifyDelete from './VerifyDelete';

interface NoteListItem {
  id: number;
  title: string;
  body: string;
  lastChecked: string;
}

interface NoteListItemProp {
  note: NoteListItem;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const BODY_TEXT_NUM = 15;
const HEADING_TEXT_NUM = 3;

export default function NoteListItem({
  note,
  showModal,
  setShowModal,
}: NoteListItemProp) {
  const { id, title, body, lastChecked } = note;

  function handleClick() {
    setShowModal(true);
  }

  return (
    <div className={style.body}>
      {showModal ? (
        <VerifyDelete noteId={id} onClose={() => setShowModal(false)}/>
      ) : (
        <>
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
          {/* <p>{body}</p> */}
          <p>last checked: {formatDate(lastChecked)}</p>
        </>
      )}
    </div>
  );
}
