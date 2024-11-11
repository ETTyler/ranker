'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container, ActionIcon, Tooltip} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconGripVertical, IconTrash} from '@tabler/icons-react';

interface Props {
  details: any
  rank: number
  userID: string
  setCoasters: any
}

export default function CoasterUI({details, rank, userID, setCoasters}: Props) {
  const removeCoaster = async () => {
    try {
      const res = await fetch(`/dashboard/coasters/api/remove`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          coasterID: details.id
        }),
      })
      const data = await res.json()
      setCoasters(data.response)
    }
    catch (err) {
      console.log(err)
    }
  }

  const isMobile = useMediaQuery(`(max-width: 800px)`);
  return (
    <>
    <Container pb={20} style={{cursor:'grab'}} fluid>
    <Card shadow='lg' padding="lg" radius="md" withBorder>
      <Group justify='space-between' wrap='nowrap'>
        <Group wrap='nowrap' gap="5px">
          <Badge size={isMobile ? 'md' : 'lg'} color="blue" mb={8}>#{rank} </Badge>
        </Group>
        <Group wrap='nowrap'>
        <IconGripVertical size={23} />
          <Tooltip label="Remove coaster" position='bottom'>
            <ActionIcon 
              color='red'
              size="input-xs" 
              variant="filled" 
              radius="md"
              onClick={() => removeCoaster()}
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
          h={isMobile ? 200 : 300}
        />
      </Card.Section>
    </Card>
    </Container>
    </>
  )
}