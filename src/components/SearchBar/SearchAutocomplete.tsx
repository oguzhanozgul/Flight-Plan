/* eslint-disable functional/immutable-data */
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AirportData, BaseAirport } from '../../types/types';
import { IconChevronRight } from '../../assets/icons/IconChevronRight';

import './SearchBar.css';
import { Autocomplete, Group, Text, SelectItemProps, Box } from '@mantine/core';
import { IconPinDrop } from '../../assets/icons/IconPinDrop';

interface Props {
  label: string;
  type: 'from' | 'to';
}

export const SearchAutocomplete = ({ label, type }: Props) => {
  const [inputValue, setInputValue] = useState<string>(''); // the input value in the search box
  const [airportOptions, setAirportOptions] = useState<BaseAirport[]>([]); // all airports
  const airports = useAppSelector<AirportData[]>(state => state.airports.airports); // all airports data from app state
  const loadingState = useAppSelector(state => state.airports.loadingState); // are airports loaded (was API call successful)
  const selectedAirport = useAppSelector(state => state.selectedAirports[type]);

  const dispatch = useAppDispatch();

  const handleInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  }, [setInputValue]);


  useEffect(() => {
    if (selectedAirport.id !== 0 && loadingState === 'success') {
      setInputValue(airports.filter(airport => airport.id === selectedAirport.id)[0].name);
    }
  }, [selectedAirport]);

  // Load human readable name of the dropdown option and the corresponding airport id
  useEffect(() => {
    if (loadingState === 'success') {
      const allOptions = airports.map(airport => {
        return {
          id: airport.id, name: `${airport.name}, ${airport.city}, ${airport.country}`
        };
      });
      setAirportOptions(allOptions);
    }
  }, [loadingState]);

  const AutoCompleteItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value, ...others }: SelectItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Box sx={{ w: "24px", h: "24px" }}>

            <IconPinDrop />
          </Box>
          <Text>{value}</Text>
        </Group>
      </div>
    )
  );

  return (
    <>
      <Autocomplete
        label={label}
        placeholder="Start typing to search..."
        itemComponent={AutoCompleteItem}
        data={loadingState === "success" ? airportOptions.map(option => ({ ...option, value: option.name })) : [{ value: "Loading airports..." }]}
        filter={(value, item) =>
          item.value.toLowerCase().includes(value.toLowerCase().trim())
        }
      />
    </>
  );
};
