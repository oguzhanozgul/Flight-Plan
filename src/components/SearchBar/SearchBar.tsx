import { SearchButton } from "./SearchButton";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { Group } from "@mantine/core";

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
