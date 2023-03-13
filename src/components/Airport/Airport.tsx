import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectedAirportChanged } from "../../store/selectionBoxesSlice";
import { AirportData } from "../../types/types";
import { airportIdToCode } from "../../utils/utils";

import "./Airport.css";
import { Rating } from "../Rating/Rating";
import { apiUrl } from "../../utils/apiUrl";
import { Button, Group, Text } from "@mantine/core";

interface Props {
  airportData: AirportData;
}

export const Airport = function ({ airportData }: Props) {
  const connections = useAppSelector((state) => state.connections.connections);
  const airports = useAppSelector((state) => state.airports.airports);
  const dispatch = useAppDispatch();

  const handleStartFromClick = () => {
    dispatch(
      selectedAirportChanged({
        id: airportData.id,
        type: "from",
      }),
    );
  };

  const handleGoToClick = () => {
    dispatch(
      selectedAirportChanged({
        id: airportData.id,
        type: "to",
      }),
    );
  };

  const myConnections = (): string[] => connections[airportData.id].map((connId) => airportIdToCode(connId, airports));

  return (
    <div className="airport">
      <img className="image" src={`${apiUrl()}${airportData.images.small}`} alt={`${airportData.name} Airport in ${airportData.country}`} />
      <div className="overlay" />
      <div className="content">
        <div className="basicInfo" style={{ height: "34px", marginBottom: "4px" }}>
          <Text>{airportData.country}</Text>
          <Rating rating={airportData.averageRating} />
        </div>
        <div className="basicInfo" style={{ height: "30px", marginBottom: "16px" }}>
          <Text>{airportData.name}</Text>
        </div>
        <Text>
          Direct connections
        </Text>
        <Text>
          {myConnections().join(" | ")}
        </Text>
        <Group spacing={12}>
          <Button color="#E46846" onClick={handleStartFromClick}>
            <Text>
              Start from
            </Text>
          </Button>
          <Button color="#E46846" onClick={handleGoToClick}>
            <Text>
              Go to
            </Text>
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default Airport;
