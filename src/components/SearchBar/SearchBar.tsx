import './SearchBar.css';
import { SearchButton } from './SearchButton';
import { SearchSelect } from './SearchSelect';
import { SearchAutocomplete } from './SearchAutocomplete';

export const SearchBar = () => {
  return (
    <div className="searchBar">
      <SearchAutocomplete label="From" type="from" />
      <SearchAutocomplete label="To" type="to" />
      <SearchButton />
    </div>
  );
};
