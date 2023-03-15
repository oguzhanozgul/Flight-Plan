/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useAppSelector } from "../../store/hooks";
import { AirportData } from "../../types/types";
import { findAllPaths } from "../../utils/connectionsGraph";
import { airportIdToCode } from "../../utils/utils";
import { Banner } from "../../components/Banner/Banner";
import { FlightImage } from "../../components/FlightImage/FlightImage";
import apiUrl from "../../utils/apiUrl";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center, Loader } from "@mantine/core";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export function Search() {
  const airports = useAppSelector<AirportData[]>((state) => state.airports.airports);
  const airportsLoadingStatus = useAppSelector((state) => state.airports.loadingState);
  const connectionsLoadingStatus = useAppSelector((state) => state.connections.loadingState);
  const connections = useAppSelector((state) => state.connections.connections);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const handleBackButtonClick = () => navigate(-1);

  const airportFrom: AirportData | undefined = airports.find((airport) => airport.id === parseInt(searchParams.get("from")!, 10));
  const airportTo: AirportData | undefined = airports.find((airport) => airport.id === parseInt(searchParams.get("to")!, 10));

  let topSortedLayoversByCode: string[][] = [];
  if (airportFrom && airportTo) {
    const minNumberOfSearchResults = 50; // give me at least this number of results
    const maxConnectionLimit = 3; // but don't go higher than this number of connecting flights
    const allPaths: number[][] = findAllPaths(
      connections,
      airportFrom.id,
      airportTo.id,
      maxConnectionLimit,
      minNumberOfSearchResults,
    );

    // sort by number of connections
    const allPathsSorted = [...allPaths].sort((a, b) => (a.length - b.length));

    const topSortedPathsById: number[][] = allPathsSorted.slice(0, minNumberOfSearchResults);
    const topSortedPathsByCode: string[][] = topSortedPathsById.map(
      (resultId) => resultId.map((id) => airportIdToCode(id, airports)),
    );
    topSortedLayoversByCode = topSortedPathsByCode.map((pathByCode) => pathByCode.slice(1, pathByCode.length - 1));
  }

  return (
    <div>
      {airportFrom && airportTo
        ? (
          <div>
            <button className="backButton" type="button" onClick={handleBackButtonClick}>
              <FontAwesomeIcon icon={faArrowLeftLong} color="white" />
              Back
            </button>

            <div className="background">
              <div className="overlay" />
              <img src={`${apiUrl()}${airportFrom.images.full}`} alt="Airport" />
              <img src={airportTo.images.full} alt="Airport" />
            </div>

            <div className="content">
              <div className="header">

                <div className="airportDetails">
                  <h2 style={{ height: "48px" }}>{airportFrom.country}</h2>
                  <p style={{ height: "30px" }}>{airportFrom.name}</p>
                </div>

                <div className="flightImage">
                  <FlightImage />
                </div>

                <div className="airportDetails">
                  <h2 style={{ height: "48px" }}>{airportTo.country}</h2>
                  <p style={{ height: "30px" }}>{airportTo.name}</p>
                </div>

              </div>
              {topSortedLayoversByCode.map((pathByCode) => (
                <Banner
                  key={`${airportFrom.code}${airportTo.code}`}
                  from={airportFrom.code}
                  to={airportTo.code}
                  layovers={pathByCode}
                />
              ))}

            </div>
          </div>
        )

        : <Navigate to="/" />}
    </div>
  );
}

export default Search;
