import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './NavTab.module.css'

export default function NavTab({text, icon}) {
  return (
    <div className={styles.tab}>
      <h2>{text}</h2>
      <FontAwesomeIcon icon={icon} size='lg' className={styles.icon}/>
    </div>
  )
}
