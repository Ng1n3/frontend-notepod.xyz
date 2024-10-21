import React from 'react';
import Button from './Button';
import styles from './ListHeader.module.css';

interface ListHeaderProp {
  searchTerm: string;
  handleSearch: () => void;
  setSearchTerm: (value: string) => void;
  type: string;
}

export default function ListHeader({
  searchTerm,
  type,
  setSearchTerm,
  handleSearch,
}: ListHeaderProp) {
  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };
  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder={`Search for your ${type}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleEnterKeyPress}
      />
      <Button onClick={handleSearch}>Search</Button>
    </header>
  );
}
