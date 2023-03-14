import { AirportGrid } from "../../components/AirportGrid/AirportGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Stack } from "@mantine/core";

export function Home() {
  return (
    <Stack spacing={48}>
      <SearchBar />
      <Stack spacing="xl">
        <AirportGrid />
      </Stack>
    </Stack>
  );
}

export default Home;
