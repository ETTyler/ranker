'use client';
import { Loader } from '@mantine/core'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group, Container, ActionIcon, Tooltip} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconGripVertical, IconTrash} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface Props {
  item: any
  rank: number
  userID: string
  setItems: any
  listeners?: any
}

export default function Show({item, rank, userID, setItems, listeners}: Props) {
  const removeItem = async () => {
    try {
      const res = await fetch(`/dashboard/shows/api/remove`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          showID: item.id
        }),
      })
      const data = await res.json()
      setItems(data.response)
    }
    catch (err) {
      console.log(err)
    }
  }

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
        <Container pb={10} style={{cursor:'grab'}} fluid>
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
                  <IconGripVertical size={isMobile? 18 : 23} {...(isMobile ? listeners : {})} style={{touchAction: 'none'}} />
                  <Tooltip label="Remove movie" position='bottom'>
                    <ActionIcon 
                      color='red'
                      size={isMobile? 26 : "input-xs"}
                      variant="filled" 
                      radius="md"
                      onClick={(event) => {
                        event.stopPropagation()
                        removeItem()
                        notifications.show({
                          title: `List updated`,
                          message: `${item.title} has been removed from your list`,
                          icon: <IconCheck />,
                          color: 'green',
                        })
                      }}
                    >
                    <IconTrash size={isMobile? 20 : 23}/>
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
            <div>
              <Text size={isMobile ? 'sm' : 'lg'} fw={600}>{item.title}</Text>
              <Text size={isMobile ? 'xs' : 'md'}>{item.network}</Text>
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
