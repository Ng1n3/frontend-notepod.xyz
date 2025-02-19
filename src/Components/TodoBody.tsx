import { useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import useTodos from '../hook/useTodos';
import CurrentTodo from './CurrentTodo';
import Footer from './Footer';
import ListTodo from './ListTodo';
import Signin from './Signin';
import styles from './TodoBody.module.css';

const MiniMenu = ({
  isCurrentNote,
  onClick,
}: {
  isCurrentNote: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.floating_toggle}>
      {isCurrentNote ? (
        <svg
          className={styles.toggle_icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          className={styles.toggle_icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      )}
    </button>
  );
};

export default function TodoBody() {
  const { currentAuth } = useAuth();
  const { fetchTodos } = useTodos();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCurrentTodo, setShowCurrentTodo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 600) {
        setShowCurrentTodo(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(
    function () {
      fetchTodos();
    },
    [fetchTodos]
  );

  const toggleView = () => {
    setShowCurrentTodo((prev) => !prev);
  };
  return (
    <>
      {windowWidth > 600 ? (
        <div className={styles.body}>
          <CurrentTodo />
          {currentAuth ? (
            <ListTodo type="todo" />
          ) : (
            <Signin destination="todos" />
          )}
        </div>
      ) : (
        <>
          {showCurrentTodo ? <CurrentTodo /> : <ListTodo type="todo" />}
          <MiniMenu isCurrentNote={showCurrentTodo} onClick={toggleView} />
        </>
      )}
      <Footer />
    </>
  );
}
