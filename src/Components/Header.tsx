import { useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import useSafeNavigate from '../hook/useSafeNavigate';
import Button from './Button';
import styles from './Header.module.css';
import Logo from './Logo';
import NavElements from './NavElements';
import PageDropHeader from './PageDropHeader';

export default function Header() {
  const { currentAuth, signout } = useAuth();
  const navigate = useSafeNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    //cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  function handleSignin() {
    navigate('/notes');
  }
  function handleSignout() {
    signout();
  }
  return (
    <div className={styles.header}>
      <Logo />
      {windowWidth > 660 ? <NavElements />: <PageDropHeader/>}
      <Button onClick={currentAuth ? handleSignout : handleSignin}>
        {currentAuth ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
}
