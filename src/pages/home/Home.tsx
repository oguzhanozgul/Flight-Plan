import * as React from "react";

import { AirportGrid } from "../../components/AirportGrid/AirportGrid";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Home() {
  return (
    <>
      <SearchBar />
      <AirportGrid />
    </>
  );
}

export default Home;
