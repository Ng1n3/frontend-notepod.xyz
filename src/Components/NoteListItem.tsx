import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './NoteListItem.module.css'
// import useNotes from "../context/useNotes";

interface NoteListItem {
  title: string;
  body: string;
  lastChecked: string;
}

interface NoteListItemProp {
  note: NoteListItem
}

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return 'Unknown date'; // Handle undefined or null

  const formattedDate =
    typeof date === 'string' ? new Date(date) : date; // Convert string to Date if necessary

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(formattedDate);
};

export default function NoteListItem({note}:NoteListItemProp) {
  const {title, body, lastChecked} =  note

  return (
    <div className={style.body}>
      <header className={style.header}>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#EC7A7C"/>
      </header>
      <p>{body}</p>
      <p>
        last checked: {formatDate(lastChecked)}
      </p>
    </div>
  );
}