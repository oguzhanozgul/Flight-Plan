import { Change } from "./Change";
import {
  Box, Group, Space, Stack,
} from "@mantine/core";

interface Props {
  layovers: string[];
}

export function LayoverBar({ layovers }: Props) {
  return (

    <Box pt={32}>
      <Stack spacing={7}>
        <Change layovers={layovers.length} />
        <Group spacing={0} position="apart">
          <Space w={16} />
          {
            layovers.map((layover) => (
              <span key={layover}>{layover}</span>
            ))
          }
          <Space w={16} />
        </Group>
      </Stack>
    </Box>
  );
}

export default LayoverBar;
