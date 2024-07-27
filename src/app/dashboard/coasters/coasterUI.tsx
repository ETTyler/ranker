'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container} from '@mantine/core'
interface Props {
  details: any
  rank: number
}

export default function CoasterUI({details, rank}: Props) {
  return (
    <>
    <Container fluid>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Text fw={500}>{rank}. {details.name}  ({details.park})</Text>
        <Badge color="blue">#{details.rank}</Badge>
      </Group>
      <Text size="md" c="dimmed" mb='md'>
        {details.model}
      </Text>
      <Card.Section>
      <Image
          radius="md"
          src={`https://pictures.captaincoaster.com/1440x1440/${details.image}`}
          alt={details.name}
          h={300}
        />
      </Card.Section>
    </Card>
    </Container>
    </>
  )
}