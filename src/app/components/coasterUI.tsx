'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container, ActionIcon, Tooltip} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconGripVertical, IconTrash} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface Props {
  details: any
  rank: number
}

export default function CoasterUI({details, rank}: Props) {
  let image

  if (details.image) {
    image = `https://pictures.captaincoaster.com/1440x1440/${details.image}`
  }
  else { 
    image = 'https://dummyimage.com/600x400/ffffff/000000&text=No+Image+Available'
  }

  const isMobile = useMediaQuery(`(max-width: 1651px)`);
  return (
    <>
    <Card shadow='lg' padding="lg" radius="md" withBorder w={isMobile ? 300 : 500} h={isMobile ? 335 : 460}>
      <Group justify='space-between' wrap='nowrap'>
        <Group wrap='nowrap' gap="5px">
          <Badge size={isMobile ? 'md' : 'lg'} color="blue" mb={8}>#{rank} </Badge>
        </Group>
      </Group>
      <Text size={isMobile ? 'md' : 'xl'} fw={600}>{details.name}</Text>
      <Text size={isMobile ? 'sm' : 'lg'}>{details.park}</Text>
      <Text size={isMobile ? 'sm' : 'lg'} c="dimmed" mb='md'>
        {details.model}
      </Text>
      <Card.Section withBorder>
      <Image
          src={image}
          alt={details.name}
          fit='cover'
          h={isMobile ? 200 : 300}
          w={isMobile ? 300 : 500}
        />
      </Card.Section>
    </Card>
    </>
  )
}