import useAuth from '../context/useAuth';
import useSafeNavigate from '../hook/useSafeNavigate';
import Button from './Button';
import styles from './Header.module.css';
import Logo from './Logo';
import NavElements from './NavElements';

export default function Header() {
  const { currentAuth, signout } = useAuth();
  const navigate = useSafeNavigate();
  function handleSignin() {
    navigate('/notes');
  }
  function handleSignout() {
    signout();
  }
  return (
    <div className={styles.header}>
      <Logo />
      <NavElements />
      <Button onClick={currentAuth ? handleSignout : handleSignin}>
        {currentAuth ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
}
