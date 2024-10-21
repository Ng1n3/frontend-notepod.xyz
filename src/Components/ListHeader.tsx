import styles from './ListHeader.module.css';

interface ListHeaderProp {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  type: string;
}

export default function ListHeader({
  searchTerm,
  type,
  setSearchTerm,
}: ListHeaderProp) {

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder={`Search for your ${type}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
}
