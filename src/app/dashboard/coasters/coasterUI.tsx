'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container} from '@mantine/core'

export default function CoasterUI({details}: {details: any}) {
  return (
    <>
    <Container fluid>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between"  mb="xs">
        <Text fw={500}>{details.name}  ({details.park})</Text>
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