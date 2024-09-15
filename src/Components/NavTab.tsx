import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import styles from './NavTab.module.css'


interface NavTabProps {
  text: string
  icon: IconProp
}

export default function NavTab({text, icon}: NavTabProps) {
  return (
    <div className={styles.tab}>
      <h2>{text}</h2>
      <FontAwesomeIcon icon={icon} size='lg' className={styles.icon}/>
    </div>
  )
}
