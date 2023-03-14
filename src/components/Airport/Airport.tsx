import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectedAirportChanged } from "../../store/selectionBoxesSlice";
import { AirportData } from "../../types/types";
import { airportIdToCode } from "../../utils/utils";

import "./Airport.css";
import { Rating } from "../Rating/Rating";
import { apiUrl } from "../../utils/apiUrl";
import {
  Button, Card, Group, Text, BackgroundImage, Stack, Overlay,
} from "@mantine/core";

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

    <BackgroundImage
      src={`${apiUrl()}${airportData.images.small}`}
      h={350}
      w={350}
      radius="md"
    >
      <Card
        bg="rgba(0, 0, 0, .5)"
        h="100%"
        sx={(theme) => ({
          transition: "all 0.5s",
          "&:hover": {
            // backdropFilter: "blur(5px)",
            transition: "2",
            backgroundColor: "rgba(0, 0, 0, .25)",
          },
        })}
      >
        {/* <Overlay color="white" opacity={0.5} /> */}
        <Stack align="stretch" justify="space-between" h="100%">

          <Group position="apart" mt="md" mb="xs">
            <Text color="white" weight={500}>{airportData.country}</Text>
            <Rating rating={airportData.averageRating} />
          </Group>

          <Text color="white">{airportData.name}</Text>

          <Stack spacing={8}>
            <Text color="white">
              Direct connections
            </Text>
            <Text color="white">
              {myConnections().join(" | ")}
            </Text>
          </Stack>

          <Group spacing={12} position="center">
            <Button w={125} color="primary" onClick={handleStartFromClick}>
              Start from
            </Button>
            <Button w={125} onClick={handleGoToClick}>
              Go to
            </Button>
          </Group>

        </Stack>

      </Card>
    </BackgroundImage>

  );
};

export default Airport;
