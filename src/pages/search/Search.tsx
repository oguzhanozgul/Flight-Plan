/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useAppSelector } from "../../store/hooks";
import { AirportData } from "../../types/types";
import { findAllPaths } from "../../utils/connectionsGraph";
import { airportIdToCode } from "../../utils/utils";
import { ConnectionBanner } from "../../components/ConnectionBanner/ConnectionBanner";
import { apiUrl } from "../../utils/apiUrl";
import flightImage from "../../assets/images/FlightImage.svg";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box, Button, Center, Group, Image, Loader, Overlay, Stack, Text, Title,
} from "@mantine/core";
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
    const minNumberOfSearchResults = 25; // give me at least this number of results
    const maxConnectionLimit = 4; // but don't go higher than this number of connecting flights
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
          <Box>
            <Box sx={{
              position: "fixed", top: "40px", left: "40px", zIndex: 1,
            }}
            >
              <Button variant="subtle" type="button" onClick={handleBackButtonClick}>
                <Group spacing={8}>
                  <FontAwesomeIcon icon={faArrowLeftLong} color="white" />
                  <Text>
                    Back
                  </Text>
                </Group>
              </Button>
            </Box>

            <Box sx={{
              position: "fixed", top: "0px", left: "0px", width: "100%", height: "100vh",
            }}
            >
              <Group noWrap spacing={0}>
                <Image src={`${apiUrl()}${airportFrom.images.large}`} height="100vh" />
                <Image src={`${apiUrl()}${airportTo.images.large}`} height="100vh" />
                <Overlay color="#000" opacity={0.30} />
              </Group>
            </Box>

            <Stack>

              <Group spacing={32} position="center" my={100} sx={{ zIndex: 1 }}>
                <Stack w={250}>
                  <Title order={2} ta="center">
                    {airportFrom.country}
                  </Title>
                  <Text ta="center">
                    {airportFrom.name}
                  </Text>
                </Stack>
                <Box>
                  <Image src={flightImage} maw={400} />
                </Box>
                <Stack w={250}>
                  <Title order={2} ta="center">
                    {airportTo.country}
                  </Title>
                  <Text ta="center">
                    {airportTo.name}
                  </Text>
                </Stack>
              </Group>

              <Box sx={{ zIndex: 1 }}>
                {topSortedLayoversByCode.map((pathByCode) => (
                  <ConnectionBanner
                    key={`${airportFrom.code}${airportTo.code}`}
                    from={airportFrom.code}
                    to={airportTo.code}
                    layovers={pathByCode}
                  />
                ))}
              </Box>

            </Stack>
          </Box>
        )

        : <Navigate to="/" />}
    </div>
  );
}

export default Search;
