import React, { useState } from 'react';
import useTodos from '../context/useTodos';
import styles from './CurrentTodo.module.css';
import CurrentTodoBody from './CurrentTodoBody';
import CurrentTodoHeader from './CurrentTodoHeader';

export default function CurrentTodo() {
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { createTodo } = useTodos();
  const [date, setDate] = useState<Date>(new Date());
  const [option, setOption] = useState<string>('LOW');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task) return;

    enum Priority {
      LOW = 'LOW',
      MEDIUM = 'MEDIUM',
      HIGH = 'HIGH',
      CRITICAL = 'CRITICAL'
    }

    interface newTodoProp {
      // id: string;
      task: string;
      description: string;
      dueDate: Date;
      priority: Priority;
    }

    const newTodo: newTodoProp = {
      // id,
      task,
      description,
      dueDate: date,
      priority: option as Priority,
    };
    // if (currentTodo?.task === task) return;
    await createTodo(newTodo);
    setTask('');
    setDescription('');
  }
  return (
    <section className={styles.todo}>
      <form>
        <CurrentTodoHeader setTask={setTask} handleSubmit={handleSubmit} />
        <CurrentTodoBody
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
