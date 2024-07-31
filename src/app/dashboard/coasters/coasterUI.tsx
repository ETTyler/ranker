'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container, ActionIcon, Tooltip} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconGripVertical, IconTrash} from '@tabler/icons-react';

interface Props {
  details: any
  rank: number
}

export default function CoasterUI({details, rank}: Props) {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  return (
    <>
    <Container fluid>
    <Card shadow='lg' padding="lg" radius="md" withBorder>
      <Group justify='space-between' wrap='nowrap'>
        <Group wrap='nowrap' gap="5px">
          <Badge size={isMobile ? 'md' : 'lg'} color="blue" mb={8}>#{rank} </Badge>
        </Group>
        <Group wrap='nowrap'>
        <IconGripVertical size={23}/>
          <Tooltip label="Remove coaster" position='bottom'>
            <ActionIcon 
              color='red'
              size="input-xs" 
              variant="filled" 
              radius="md"
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Text size={isMobile ? 'md' : 'xl'} fw={600}>{details.name}</Text>
      <Text size={isMobile ? 'sm' : 'lg'}>{details.park}</Text>
      <Text size={isMobile ? 'sm' : 'lg'} c="dimmed" mb='md'>
        {details.model}
      </Text>
      <Card.Section withBorder>
      <Image
          src={`https://pictures.captaincoaster.com/1440x1440/${details.image}`}
          alt={details.name}
          fit='cover'
          h={isMobile ? 200 : 400}
        />
      </Card.Section>
    </Card>
    </Container>
    </>
  )
}