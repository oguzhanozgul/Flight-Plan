import { useAppSelector } from "../../store/hooks";
import { AirportData } from "../../types/types";
import { Airport } from "../Airport/Airport";
import Spinner from "../Spinner/Spinner";

import "./AirportGrid.css";

export function AirportGrid() {
  const airports = useAppSelector<AirportData>((state) => state.airports.airports);
  const airportsLoadingStatus = useAppSelector((state) => state.airports.loadingState);
  const connectionsLoadingStatus = useAppSelector((state) => state.connections.loadingState);

  if (airportsLoadingStatus === "pending" || connectionsLoadingStatus === "pending") {
    return <Spinner />;
  }
  if (airportsLoadingStatus === "fail" || connectionsLoadingStatus === "fail") {
    return (
      <>Error loading data.</>
    );
  }

  return (
    <div className="airportGrid">
      {airports.map((airport) => (<Airport key={airport.code} airportData={airport} />))}
    </div>
  );
}

export default AirportGrid;
