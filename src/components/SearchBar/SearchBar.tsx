import { Group } from "@mantine/core";
import { SearchButton } from "./SearchButton";
import { SearchAutocomplete } from "./SearchAutocomplete";

export function SearchBar() {
  return (
    <Group>
      <SearchAutocomplete label="From" type="from" />
      <SearchAutocomplete label="To" type="to" />
      <SearchButton />
    </Group>
  );
}

export default SearchBar;
