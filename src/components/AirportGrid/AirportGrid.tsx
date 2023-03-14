import { useAppSelector } from "../../store/hooks";
import { AirportData } from "../../types/types";
import { Airport } from "../Airport/Airport";
import { Center, Flex, Loader } from "@mantine/core";

import "./AirportGrid.css";

export function AirportGrid() {
  const airports = useAppSelector<AirportData[]>((state) => state.airports.airports);
  const airportsLoadingStatus = useAppSelector((state) => state.airports.loadingState);
  const connectionsLoadingStatus = useAppSelector((state) => state.connections.loadingState);

  if (airportsLoadingStatus === "pending" || connectionsLoadingStatus === "pending") {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (airportsLoadingStatus === "fail" || connectionsLoadingStatus === "fail") {
    return (
      <>Error loading data.</>
    );
  }

  return (
    <Flex wrap="wrap" gap={64} justify="center">
      {airports.map((airport) => (<Airport key={airport.code} airportData={airport} />))}
    </Flex>
  );
}

export default AirportGrid;
