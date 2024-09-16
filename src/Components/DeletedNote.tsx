import { faHandPeace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedNote.module.css';

export default function DeletedNote() {
  return (
    <p className={styles.deletedParagraph}>
      Hey{' '}
      <span>
        <FontAwesomeIcon icon={faHandPeace} />, Deleted items are permanently
        removed after 20 days if not recovered.
      </span>
    </p>
  );
}
