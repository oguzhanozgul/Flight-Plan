import * as React from 'react';

import styles from './SearchBar.scss';
import { SearchButton } from './SearchButton';
import { SearchSelect } from './SearchSelect';

export const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <SearchSelect label="From" type="from" />
      <SearchSelect label="To" type="to" />
      <SearchButton />
    </div>
  );
};
