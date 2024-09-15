import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './NoteListItem.module.css'

interface NoteListItemProp {
  title: string;
  body: string;
  lastChecked: string;
}


export default function NoteListItem({title, body, lastChecked}: NoteListItemProp) {
  return (
    <div className={style.body}>
      <header className={style.header}>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={faCircleXmark} size="xl" color="#EC7A7C"/>
      </header>
      <p>{body}</p>
      <p>
        last checked: <em>{lastChecked}</em>
      </p>
    </div>
     
  );
}
