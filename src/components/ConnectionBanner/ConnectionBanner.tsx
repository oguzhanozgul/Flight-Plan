import { LayoverBar } from "../LayoverBar/LayoverBar";
import {
  Card, Flex, Group, Title, Text, Button, Box,
} from "@mantine/core";

interface Props {
  from: string;
  to: string;
  layovers: string[];
}

export function ConnectionBanner({ from, to, layovers }: Props) {
  const changesCount = layovers.length;

  return (
    <Card radius="md" mb={24}>
      <Flex justify="space-between" gap={32}>
        <Group spacing={24} position="center">
          <Title order={4}>
            {from}
          </Title>
          <LayoverBar layovers={layovers} />
          <Title order={4}>
            {to}
          </Title>
        </Group>
        <Group spacing={16} position="right">
          <Text>
            {changesCount === 0 ? "Direct" : `${changesCount} change${changesCount > 1 ? "s" : ""}`}
          </Text>
          <Button color="primary">
            Go!
          </Button>
        </Group>
      </Flex>
    </Card>

  );
}

export default ConnectionBanner;
