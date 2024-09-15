import {faCircleCheck, faLock, faNoteSticky, faTrash} from '@fortawesome/free-solid-svg-icons'
import NavTab from "./NavTab";
import styles from './NavElement.module.css'

export default function NavElements() {
  return (
    <div className={styles.elements}>
      <NavTab text='Notes' icon={faNoteSticky} />
      <NavTab text='Todos' icon={faCircleCheck}/>
      <NavTab text='Passwords' icon={faLock}/>
      <NavTab text='Deleted' icon={faTrash}/>
    </div>
  )
}
