import { forwardRef, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AirportData, BaseAirport } from "../../types/types";
import { IconChevronRight } from "../../assets/icons/IconChevronRight";

import "./SearchBar.css";
import {
  Autocomplete, Group, Text, SelectItemProps, Box,
} from "@mantine/core";
import { IconPinDrop } from "../../assets/icons/IconPinDrop";

interface Props {
  label: string;
  type: "from" | "to";
}

export function SearchAutocomplete({ label, type }: Props) {
  const [value, setValue] = useState({ optionId: -1, label: "" }); // the input value in the search box
  const [airportOptions, setAirportOptions] = useState<BaseAirport[]>([]); // all airports
  const airports = useAppSelector<AirportData[]>((state) => state.airports.airports); // all airports data from app state
  const loadingState = useAppSelector((state) => state.airports.loadingState); // are airports loaded (was API call successful)
  const selectedAirport = useAppSelector((state) => state.selectedAirports[type]);

  const dispatch = useAppDispatch();

  // const handleInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
  //   setValue(event.currentTarget.value);
  // }, [setValue]);

  // useEffect(() => {
  //   if (selectedAirport.id !== 0 && loadingState === 'success') {
  //     setValue(airports.filter(airport => airport.id === selectedAirport.id)[0].name);
  //   }
  // }, [selectedAirport]);

  // Load human readable name of the dropdown option and the corresponding airport id
  useEffect(() => {
    if (loadingState === "success") {
      const allOptions = airports.map((airport) => ({
        id: airport.id, name: `${airport.name}, ${airport.city}, ${airport.country}`,
      }));
      setAirportOptions(allOptions);
    }
  }, [loadingState]);

  const AutocompleteData = () => (loadingState === "success" ? airportOptions.map((option) => ({ optionId: option.id, value: option.name })) : [{ optionId: -1, value: "Loading airports..." }]);

  interface ItemProps extends SelectItemProps {
    optionId: number;
  }

  const AutocompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ value, optionId, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Box w="24px" h="24px">
            <IconPinDrop />
          </Box>
          <Text>{value}</Text>
        </Group>
      </div>
    ),
  );

  return (
    <Group spacing={8}>
      <Text>{label}</Text>
      <Autocomplete
        w="400px"
        nothingFound="No results..."
        placeholder="Start typing to search..."
        itemComponent={AutocompleteItem}
        data={AutocompleteData()}
        filter={(value, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
        value={value.label}
      // onChange={setValue}
      />
    </Group>
  );
}

export default SearchAutocomplete;
