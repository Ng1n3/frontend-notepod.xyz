import CurrentTodoBody from './CurrentTodoBody'
import CurrentTodoHeader from './CurrentTodoHeader'
import styles from './CurrentTodo.module.css'

export default function CurrentTodo() {
  return (
    <section className={styles.todo}>
      <CurrentTodoHeader/>
      <CurrentTodoBody/>
      </section>
  )
}
