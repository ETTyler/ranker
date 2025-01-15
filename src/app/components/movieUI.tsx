'use client';
import { Loader } from '@mantine/core'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container, ActionIcon, Tooltip} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconGripVertical, IconTrash} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface Props {
  item: any
  rank: number
}

export default function Movie({item, rank}: Props) {
  let image

  if (item.poster_path) {
    image = `https://image.tmdb.org/t/p/original${item.poster_path}`
  }
  else { 
    image = 'https://dummyimage.com/600x400/ffffff/000000&text=No+Image+Available'
  }

  const isMobile = useMediaQuery(`(max-width: 700px)`);
  
  if (!item) return <Loader />
  
  return (
    <>
      <Container pb={10} fluid>
        <Card shadow='lg' padding={isMobile ? 'xs' : 'sm'} radius="md" withBorder w={isMobile ? '80vw' : 600} >
          <Group wrap='nowrap'>
            <Image
              src={image}
              alt={item.title}
              fit='cover'
              h={isMobile ? 80 : 130}
              radius={10}
            />
            <Flex direction='column' w='100%'>
              <Flex direction='row' justify='space-between' align='flex-start' pr={10}>  
                <div>
                  <Badge size={isMobile ? 'sm' : 'lg'} color="blue" mb={isMobile ? 0 : 8}>#{rank} </Badge>
                </div>
                <Group gap='sm'>
                </Group>
              </Flex>
            <div>
              <Text size={isMobile ? 'sm' : 'lg'} fw={600}>{item.title}</Text>
              <Text size={isMobile ? 'xs' : 'md'}>{item.director}</Text>
              <Text size={isMobile ? 'xs' : 'md'} c="dimmed">
                {item.release_date}
              </Text>
            </div>
            </Flex>
          </Group>
        </Card>
      </Container>
    </>
  )
}
