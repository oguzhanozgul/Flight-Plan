import { AirportGrid } from "../../components/AirportGrid/AirportGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Stack } from "@mantine/core";

export function Home() {
  return (
    <Stack spacing="xl">
      <SearchBar />
      <AirportGrid />
    </Stack>
  );
}

export default Home;
