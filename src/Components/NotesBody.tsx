import useAuth from '../context/useAuth';
import CurrentNote from './CurrentNote';
import Footer from './Footer';
import List from './List';
import styles from './NoteBody.module.css';
import Signin from './Signin';

export default function NotesBody() {
  const {currentAuth} = useAuth()

  return (
    <>
      <div className={styles.body}>
        <CurrentNote />
        {currentAuth ? <List type='note'/> : <Signin destination='notes'/>}
      </div>
      <Footer />
    </>
  );
}