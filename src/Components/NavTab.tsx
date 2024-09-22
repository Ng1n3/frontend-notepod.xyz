import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './NavTab.module.css';

interface NavTabProps {
  text: string;
  to: string;
  icon: IconProp;
}

export default function NavTab({ text, icon, to }: NavTabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? `${styles.active}` : styles.tab)}
    >
      <div className={styles.tab}>
        <h2>{text}</h2>
        <FontAwesomeIcon icon={icon} size="lg" className={styles.icon} />
      </div>
    </NavLink>
  );
}
