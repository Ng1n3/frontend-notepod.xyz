import styles from './LastSaved.module.css';

export default function LastSaved() {
  return (
      <p className={styles.paragraph}>
        <strong>Last saved:</strong>{' '}
        <span>
          <em>Thursday, 25th, August, 2024</em>
        </span>{' '}
      </p>
  );
}
