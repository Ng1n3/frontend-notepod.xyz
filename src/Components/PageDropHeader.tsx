import {
  faChevronDown,
  faCircleCheck,
  faLock,
  faNoteSticky,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import NavTab2 from './NavTab2';
import styles from './PageDropHeader.module.css'

interface MenuItem {
  text: string;
  icon: IconDefinition;
  to: string;
}

interface SelectedItem {
  text: string;
  icon: IconDefinition | null;
  to?: string;
}

export default function PageDropHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    text: 'Menu',
    icon: null,
  });
  const location = useLocation();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      { text: 'Notes', icon: faNoteSticky, to: '/notes' },
      { text: 'Todos', icon: faCircleCheck, to: '/todos' },
      { text: 'Passwords', icon: faLock, to: '/passwords' },
      { text: 'Deleted', icon: faTrash, to: '/deleted' },
    ],
    []
  );

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.to === location.pathname);
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location, menuItems]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown_container}>
      <button className={styles.dropdown_toggle} onClick={toggleDropdown}>
        <div className={styles.selected_item}>
          {selectedItem.icon && (
            <FontAwesomeIcon
              icon={selectedItem.icon}
              className={styles.dropdown_icon}
            />
          )}
          <span>{selectedItem.text}</span>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${isOpen ? 'rotate' : ''}`}
        />
      </button>

      <ul className={`${styles.dropdown_menu} ${isOpen ? `${styles.open}` : ''}`}>
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavTab2
              text={item.text}
              icon={item.icon}
              to={item.to}
              onSelect={() => {
                setSelectedItem(item);
                setIsOpen(false);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}