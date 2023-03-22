import { SearchButton } from "./SearchButton";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { Box, Center, Group } from "@mantine/core";

export function SearchBar() {
  return (
    <Box
      mt={32}
      mx="auto"
      sx={{
        position: "sticky", top: "10px", zIndex: 10, borderRadius: 8, backgroundColor: "rgba(56, 54, 56, 0.7)",
      }}
    >
      <Center h="100%" w="100%" p="sm">
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
