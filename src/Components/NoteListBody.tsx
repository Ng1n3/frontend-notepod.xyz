import styles from './NoteListBody.module.css';
import NoteListItem from './NoteListItem';

export default function NoteListBody() {
  return (
    <>
      <div className={styles.listBody}>
        <NoteListItem
          title="Last trip to Mecca"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="20/04/2024"
        />
        <NoteListItem
          title="Welcome to Sango Ota"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="18/04/2024"
        />
        <NoteListItem
          title="Dope Stufs"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="17/04/2024"
        />
        <NoteListItem
          title="Welcome to San Diego"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="14/04/2024"
        />
        <NoteListItem
          title="My Experience in Dagastani"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="10/04/2024"
        />
        <NoteListItem
          title="My Experience in Dagastani"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="09/04/2024"
        />
        <NoteListItem
          title="My Experience in Dagastani"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="09/04/2024"
        />
        <NoteListItem
          title="My Experience in Dagastani"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="09/04/2024"
        />
        <NoteListItem
          title="My Experience in Dagastani"
          body="Lorem ipsum dolor sit amet consectetur. Porttitor a sed lectus quam. Ultricies elit pharetra nulla ut mollis habitasse neque non donec. Et massa sapien lectus aliquet amet ut viverra massa."
          lastChecked="09/04/2024"
        />
      </div>
      
    </>
  );
}
