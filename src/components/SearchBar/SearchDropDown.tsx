import * as React from 'react';

import { BaseAirport } from '../../types/types';

import styles from './SearchBar.scss';
import { SearchDropDownOption } from './SearchDropDownOption';

interface Props {
  options: BaseAirport[];
  setSelection: (id: number) => void;
  visible: boolean;
}

export const SearchDropDown = ({ options, setSelection, visible }: Props) => {
  return (
    <div className={`${styles.dropDown} ${!visible ? styles.invisible : ''}`}>
      {options.map(option => <SearchDropDownOption key={option.id} option={option} setSelection={setSelection} />)}
    </div>
  );
};
