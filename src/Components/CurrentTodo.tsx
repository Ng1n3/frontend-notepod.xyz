import React, { useCallback, useEffect, useState } from 'react';
import useTodos from '../context/useTodos';
import useSafeNavigate from '../hook/useSafeNavigate';
import styles from './CurrentTodo.module.css';
import CurrentTodoBody from './CurrentTodoBody';
import CurrentTodoHeader from './CurrentTodoHeader';

export default function CurrentTodo() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { createTodo, currentTodo, updateTodo } = useTodos();
  const [date, setDate] = useState<Date>(new Date());
  const [option, setOption] = useState<string>('LOW');

  const navigate = useSafeNavigate();
  // useEffect(
  //   function () {
  //     if (id) {
  //       fetchTodo(id);
  //     }
  //   },
  //   [id, fetchTodo]
  // );

  
  useEffect(
    function () {
      if (currentTodo) {
        // console.log("current todo from currentTodo", currentTodo);
        setTitle(currentTodo.title);
        setDescription(currentTodo.body);
        setDate(currentTodo.dueDate);
        setOption(currentTodo.priority);
      } else {
        setTitle('');
        setDescription('');
        setDate(new Date())
        setOption('LOW')
      }
    },
    [currentTodo]
  );

  const handleSubmit = useCallback(
    async function (e: React.FormEvent) {
      e.preventDefault();
      if (!title) return;

      // enum Priority {
      //   LOW,
      //   MEDIUM,
      //   HIGH,
      //   CRITICAL,
      // }

      // interface newTodoProp {
      //   // id: string;
      //   task: string;
      //   description: string;
      //   dueDate: Date;
      //   priority: Priority;
      // }

      // const newTodo: newTodoProp = {
      //   // id,
      //   task,
      //   description,
      //   dueDate: date,
      //   priority: option as Priority,
      // };
      if (currentTodo) {
        // console.log("here there is a current todo", currentTodo);
        await updateTodo({
          ...currentTodo,
          title,
          description,
          id: currentTodo.id,
        });
      } else {
        await createTodo({ title, description, dueDate, priority });
      }
      setTitle('');
      setDescription('');
      if (currentTodo?.title === title) return;
      navigate('/');
    },
    [currentTodo, createTodo, description, navigate, title, updateTodo]
  );
  // console.log([title, date, option, description]);
  return (
    <section className={styles.todo}>
      <form>
        <CurrentTodoHeader
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
        />
        <CurrentTodoBody
          description={description}
          date={date}
          setDate={setDate}
          setDescription={setDescription}
          setOption={setOption}
          option={option}
        />
      </form>
    </section>
  );
}
