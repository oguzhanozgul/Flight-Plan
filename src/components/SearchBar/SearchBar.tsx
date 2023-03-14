import { SearchButton } from "./SearchButton";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { Box, Center, Group } from "@mantine/core";

export function SearchBar() {
  return (
    <Box h="100%">
      <Center h="100%" w="100%" mx="auto" p="md">
        <Group position="center">
          <SearchAutocomplete type="from" />
          <SearchAutocomplete type="to" />
          <SearchButton />
        </Group>
      </Center>
    </Box>
  );
}

export default SearchBar;
