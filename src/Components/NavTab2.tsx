import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './NavTab2.module.css';

interface NavTabProps {
  text: string;
  icon: IconDefinition;
  to: string;
  onSelect?: () => void;
}

export default function NavTab2({ text, icon, to, onSelect }: NavTabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.nav_tab} ${isActive ? `${styles.active}` : ''}`}
      onClick={onSelect}
    >
      <div className={styles.tab_content}>
        <h2>{text}</h2>
        <FontAwesomeIcon icon={icon} size="lg" className={styles.tab_icon} />
      </div>
    </NavLink>
  );
}
