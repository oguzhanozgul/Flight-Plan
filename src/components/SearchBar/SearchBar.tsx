import * as React from 'react';

import './SearchBar.css';
import { SearchButton } from './SearchButton';
import { SearchSelect } from './SearchSelect';

export const SearchBar = () => {
  return (
    <div className="searchBar">
      <SearchSelect label="From" type="from" />
      <SearchSelect label="To" type="to" />
      <SearchButton />
    </div>
  );
};
