import Button from "./Button";
import Logo from "./Logo"
import NavElements from "./NavElements"
import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo/>
      <NavElements/>
      <Button>Sign out</Button>
    </div>
  );
}
