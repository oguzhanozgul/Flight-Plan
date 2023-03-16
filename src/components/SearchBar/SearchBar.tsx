import { SearchButton } from "./SearchButton";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { Box, Center, Group } from "@mantine/core";

export function SearchBar() {
  return (
    <Box
      mt={32}
      p={8}
      mx="auto"
      bg="#0C090D"
      sx={{
        position: "sticky", top: "10px", zIndex: 10, borderRadius: 8,
      }}
    >
      <Center h="100%" w="100%" p="md">
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
