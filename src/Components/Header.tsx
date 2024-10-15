import useAuth from '../context/useAuth';
import useSafeNavigate from '../hook/useSafeNavigate';
import Button from './Button';
import styles from './Header.module.css';
import Logo from './Logo';
import NavElements from './NavElements';

export default function Header() {
  const { currentAuth } = useAuth();
  const navigate = useSafeNavigate();
  function handleSignin() {
    navigate('/notes');
  }
  return (
    <div className={styles.header}>
      <Logo />
      <NavElements />
      <Button onClick={handleSignin}>
        {currentAuth ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
}
