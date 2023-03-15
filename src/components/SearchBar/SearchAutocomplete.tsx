import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AirportData, BaseAirport } from "../../types/types";
import { selectedAirportChanged, selectedAirportRemoved } from "../../store/selectionBoxesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, useEffect, useState } from "react";

import {
  Autocomplete, Group, Text, SelectItemProps, Box, AutocompleteItem,
} from "@mantine/core";

interface AutocompleteItemProps extends SelectItemProps {
  optionId: number;
}

const MyAutocompleteItem = forwardRef<HTMLDivElement, AutocompleteItemProps>(
  ({
    value, ...others
  }: AutocompleteItemProps, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={ref} {...others}>
      <Group noWrap>
        <Box w="24px" h="24px">
          <FontAwesomeIcon icon={faLocationDot} color="#848CA2" />
        </Box>
        <Text>
          {value}
        </Text>
      </Group>
    </div>
  ),
);

interface SearchAutocompleteProps {
  type: "from" | "to";
}

export function SearchAutocomplete({ type }: SearchAutocompleteProps) {
  const [value, setValue] = useState(""); // the input value in the search box
  const [airportOptions, setAirportOptions] = useState<BaseAirport[]>([]); // all airports
  const airports = useAppSelector<AirportData[]>((state) => state.airports.airports); // all airports data from app state
  const loadingState = useAppSelector((state) => state.airports.loadingState); // are airports loaded (was API call successful)+
  const selectedAirport = useAppSelector((state) => state.selectedAirports[type]);

  const dispatch = useAppDispatch();

  const handleInputChange = (val: string) => {
    setValue(val);
  };

  const handleItemSubmit = (item: AutocompleteItem) => {
    dispatch(
      selectedAirportChanged({
        id: item.optionId,
        type,
      }),
    );
  };

  const handleXClick = () => {
    setValue("");
    dispatch(
      selectedAirportRemoved({
        type,
      }),
    );
  };

  // Load human readable name of the dropdown option and the corresponding airport id
  useEffect(() => {
    if (loadingState === "success") {
      const allOptions = airports.map((airport) => ({
        id: airport.id, name: `${airport.name}, ${airport.city}, ${airport.country}`,
      }));
      setAirportOptions(allOptions);
    }
  }, [loadingState]);

  useEffect(() => {
    if (selectedAirport.id !== 0 && loadingState === "success") {
      setValue(airports.filter((airport) => airport.id === selectedAirport.id)[0].name);
    }
  }, [selectedAirport]);

  // Prepare list data using the API data
  const autocompleteData = (): (AutocompleteItem | string)[] => (loadingState === "success" ? airportOptions.map((option) => ({ optionId: option.id, value: option.name })) : [{ optionId: -1, value: "Loading airports..." }]);

  // Icon on the right side
  const rightSection = () => {
    if (value === "") return null;
    return (
      <FontAwesomeIcon icon={faXmark} color="#848CA2" onClick={handleXClick} />
    );
  };

  return (
    <Autocomplete
      w="400px"
      icon={<FontAwesomeIcon icon={faLocationDot} color="#848CA2" />}
      rightSection={rightSection()}
      nothingFound="No results..."
      placeholder={type === "from" ? "From..." : "To..."}
      itemComponent={MyAutocompleteItem}
      data={autocompleteData()}
      limit={10}
      filter={(val, item) => item.value.toLowerCase().includes(val.toLowerCase().trim())}
      value={value}
      onChange={(val) => handleInputChange(val)}
      onItemSubmit={(item) => handleItemSubmit(item)}
    />
  );
}

export default SearchAutocomplete;
