import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <em>
          Designed and Developed by{' '}
          <strong>
            <a href="https://github.com/ng1n3">Muyiwa</a>
          </strong>
        </em>
      </footer>
  )
}
