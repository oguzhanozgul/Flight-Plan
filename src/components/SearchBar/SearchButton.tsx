import * as React from 'react';
import { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { IconSearch } from '../../assets/icons/IconSearch';

import styles from './SearchBar.scss';

export const SearchButton = () => {
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const fromId = useAppSelector(state => state.selectedAirports.from.id);
  const toId = useAppSelector(state => state.selectedAirports.to.id);
  const navigate = useNavigate();

  useEffect(() => {
    setEnabled(fromId !== 0 && toId !== 0);
  }, [fromId, toId]);

  const handleSearchClick = () => {
    if (enabled) {
      const params = { from: fromId.toString(), to: toId.toString() };
      navigate({ pathname: '/search', search: `?${createSearchParams(params)}` });
    }
  };

  return (
    <button className={styles.searchButton} title="Search" onClick={handleSearchClick}>
      <IconSearch />
    </button>
  );
};
