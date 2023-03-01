/* eslint-disable functional/immutable-data */
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectedAirportChanged } from '../../store/selectionBoxesSlice';
import { AirportData, BaseAirport } from '../../types/types';
import { parseAirportName } from '../../utils/utils';
import { IconChevronRight } from '../../assets/icons/IconChevronRight';

import './SearchBar.css';
import { SearchDropDown } from './SearchDropDown';

interface Props {
  label: string;
  type: 'from' | 'to';
}

export const SearchSelect = ({ label, type }: Props) => {
  const [inputValue, setInputValue] = useState<string>(''); // the input value in the search box
  const [searching, setSearching] = useState<boolean>(false); // we use a short delay before triggering search. This state variable is set only after that delay, in order not to show the full list (as opposed to checking for input value - which is truthy immediately after user starts typing)
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false); // state variable to decide if we should show the drop down
  const [filteredOptions, setFilteredOptions] = useState<BaseAirport[]>([]); // airports which contain the input value
  const [allOptions, setAllOptions] = useState<BaseAirport[]>([]); // all airports
  const airports = useAppSelector<AirportData[]>(state => state.airports.airports); // all airports data from app state
  const loadingState = useAppSelector(state => state.airports.loadingState); // are airports loaded (was API call successful)
  const selectedAirport = useAppSelector(state => state.selectedAirports[type]);

  const dispatch = useAppDispatch();

  const handleClickOutside = () => {
    hideDropDown();
  };

  const handleInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  }, [setInputValue]);

  const showDropDown = useCallback(() => {
    setDropDownOpen(true);
  }, [setDropDownOpen]);

  const hideDropDown = () => {
    setDropDownOpen(false);
  };

  const triggerFilter = () => {
    if (inputValue !== '') {
      const filtOptions = allOptions
        .filter(option => option.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() // remove diacritics for better match
          .includes(inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())); // remove diacritics for better match

      setFilteredOptions(filtOptions);
      setSearching(true);
    } else {
      setSearching(false);
    }
  };

  const setSelectedAirport = useCallback((id: number): void => {
    dispatch(
      selectedAirportChanged({
        id,
        type,
      }),
    );
    hideDropDown();
  }, [setDropDownOpen]);

  useEffect(() => {
    if (selectedAirport.id !== 0 && loadingState === 'success') {
      setInputValue(airports.filter(airport => airport.id === selectedAirport.id)[0].name);
    }
  }, [selectedAirport]);

  // delay a little before triggering filtering
  const triggerDelayMilliSeconds = 250;
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      triggerFilter();
    }, triggerDelayMilliSeconds);

    return () => clearTimeout(timeOutId);
  }, [inputValue]);

  // Load human readable name of the dropdown option and the corresponding airport id
  useEffect(() => {
    if (loadingState === 'success') {
      const allOptions = airports.map(airport => {
        return {
          id: airport.id, name: `${airport.name}, ${airport.city}, ${airport.country}`
        };
      });
      setAllOptions(allOptions);
      setFilteredOptions(allOptions);
    }
  }, [loadingState]);

  const getOptionsForDropdown = (): BaseAirport[] => {
    if (loadingState !== 'success') { return [{ id: -1, name: 'Loading airports...' }]; }
    return filteredOptions;
  };

  return (
    <div className="searchSelect" onClick={showDropDown}>
      <div className="searchSelectRows">
        <div className="searchSelectLabel">
          {label}
        </div>
        <input
          className="searchSelectText"
          type="text"
          id="fname"
          name="fname"
          value={inputValue}
          placeholder={dropDownOpen ? 'Start typing to search...' : '-'}
          onChange={handleInputChange}
        />
      </div>
      <div className="searchSelectIcon">
        <IconChevronRight />
      </div>
      {/* A better way which makes more sense is to use a ready made dropdown with search capabilities, particularly from a design
      system such as MUI or Chakra, as this will save much development time. */}
      <SearchDropDown options={getOptionsForDropdown()} setSelection={setSelectedAirport} visible={dropDownOpen} />
    </div>

  );
};
