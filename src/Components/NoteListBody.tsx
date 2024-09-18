import styles from './NoteListBody.module.css';
import NoteListItem from './NoteListItem';

const notes = [
  {
    title: 'Last trip to Mecca',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '20/04/2024',
  },
  {
    title: 'Welcome to Sango Ota',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '18/04/2024',
  },
  {
    title: 'Dope Stufs',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '17/04/2024',
  },
  {
    title: 'Welcome to San Diego',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '14/04/2024',
  },
  {
    title: 'My Experience in Dagastani',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '10/04/2024',
  },
  {
    title: 'My Experience in Dagastani',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '10/04/2024',
  },
  {
    title: 'My Experience in Dagastani',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '10/04/2024',
  },
  {
    title: 'My Experience in Dagastani',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '10/04/2024',
  },
  {
    title: 'My Experience in Dagastani',
    body: 'Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa.',
    lastChecked: '10/04/2024',
  },
];

export default function NoteListBody() {
  return (
    <>
      <div className={styles.listBody}>
        {notes.map((note, index) => (
          <NoteListItem
            key={index}
            title={note.title}
            body={note.body}
            lastChecked={note.lastChecked}
          />
        ))}
      </div>
    </>
  );
}
