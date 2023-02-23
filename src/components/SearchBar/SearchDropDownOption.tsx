/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

import { BaseAirport } from '../../types/types';
import { IconAirplane } from '../../assets/icons/IconAirplane';
import { IconPinDrop } from '../../assets/icons/IconPinDrop';

import styles from './SearchBar.scss';

interface Props {
  option: BaseAirport;
  setSelection: (id: number) => void;
}

export const SearchDropDownOption = ({ option, setSelection }: Props) => {
  const handleClick = () => {
    if (option.id !== -1) {
      setSelection(option.id);
    }
  };

  return (

    <div className={`${styles.dropDownOption} ${option.id === -1 ? styles.firstDefaultOption : ''}`} onClick={handleClick} >
      <div className={styles.dropDownIcon}>
        {option.id === -1 ? <IconAirplane /> : <IconPinDrop />}
      </div>
      {option.name}
    </div >

  );
};
