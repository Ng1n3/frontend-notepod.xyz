import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotAllowed.module.css';
import useSafeNavigate from '../hook/useSafeNavigate';

export default function NotAllowed() {
  const navigate = useSafeNavigate()
  function handleSignUp() {
    navigate('/notes');
  }

  return (
    <div className={styles.body}>
      <FontAwesomeIcon icon={faBan} className={styles.ban}/>
      <h1>You must be signed in to access this page.</h1>
      <p><span onClick={handleSignUp}>Sign up</span> here</p>
      <p>
        Do you have an account? <span onClick={handleSignUp}>sign in</span> here instead
      </p>
    </div>
  );
}
