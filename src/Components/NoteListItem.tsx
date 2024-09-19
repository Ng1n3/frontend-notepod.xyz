import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortentext } from '../util/shortenText';
import style from './NoteListItem.module.css';
import { formatDate } from '../util/formatDate';
// import useNotes from "../context/useNotes";

interface NoteListItem {
  title: string;
  body: string;
  lastChecked: string;
}

interface NoteListItemProp {
  note: NoteListItem;
}



const BODY_TEXT_NUM = 15;
const HEADING_TEXT_NUM = 3;

export default function NoteListItem({ note }: NoteListItemProp) {
  const { title, body, lastChecked } = note;

  return (
    <div className={style.body}>
      <header className={style.header}>
        <h2>{shortentext(title, HEADING_TEXT_NUM)}</h2>
        <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#EC7A7C" />
      </header>
      <p>{shortentext(body, BODY_TEXT_NUM)}</p>
      <p>last checked: {formatDate(lastChecked)}</p>
    </div>
  );
}
