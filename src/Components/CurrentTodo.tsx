import { useCallback, useEffect, useState } from 'react';
import useTodos from '../hook/useTodos';
import { useAuth } from '../hook/useAuth';
import styles from './CurrentTodo.module.css';
import CurrentTodoBody from './CurrentTodoBody';
import CurrentTodoHeader from './CurrentTodoHeader';

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export default function CurrentTodo() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { createTodo, currentTodo, updateTodo, clearCurrentTodo } = useTodos();
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const { currentAuth } = useAuth();

  useEffect(
    function () {
      if (currentTodo) {
        setTitle(currentTodo.title || '');
        setBody(currentTodo.body || '');
        setDueDate(currentTodo.dueDate || new Date());
        setPriority(currentTodo.priority || Priority.LOW);
      } else {
        setTitle('');
        setBody('');
        setDueDate(new Date());
        setPriority(Priority.LOW);
      }
    },
    [currentTodo]
  );

  const handleSubmit = useCallback(
    async function (event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!title) return;

      // console.log("currentAuthID", currentAuth.id);

      if (currentTodo && currentTodo.id) {
        await updateTodo({
          id: currentTodo.id,
          title,
          body,
          dueDate,
          priority,
          userId: currentAuth!.id,
        });
        clearCurrentTodo();
      } else {
        await createTodo({
          title,
          body: body,
          dueDate,
          priority,
          userId: currentAuth!.id,
        });
      }
      setTitle('');
      setBody('');
      if (currentTodo?.title === title) return;
    },
    [
      currentTodo,
      createTodo,
      body,
      title,
      currentAuth,
      updateTodo,
      dueDate,
      priority,
      clearCurrentTodo,
    ]
  );
  return (
    <section className={styles.todo}>
      <form>
        <CurrentTodoHeader
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
        />
        <CurrentTodoBody
          body={body}
          dueDate={dueDate}
          setDueDate={setDueDate}
          setBody={setBody}
          setPriority={(newPriority: keyof typeof Priority) =>
            setPriority(Priority[newPriority])
          }
          priority={priority}
        />
      </form>
    </section>
  );
}
