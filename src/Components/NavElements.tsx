import {
  faCircleCheck,
  faLock,
  faNoteSticky,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styles from './NavElement.module.css';
import NavTab from './NavTab';

export default function NavElements() {
  return (
    <div className={styles.elements}>
      <NavTab text="Notes" icon={faNoteSticky} to="/" />
      <NavTab text="Todos" icon={faCircleCheck} to="/todos" />
      <NavTab text="Passwords" icon={faLock} to="/passwords" />
      <NavTab text="Deleted" icon={faTrash} to="/deleted" />
    </div>
  );
}
