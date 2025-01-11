'use client';

import { Autocomplete, ActionIcon, Group, Container, Tooltip, Loader, Center } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';

export default function Search({userID, setItems}: {userID: string, setItems: any}) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const itemSearch  = async (item: string) => {
    if (item.length < 1) return {response: []}
    try {
      const res = await fetch(`/dashboard/movies/api/search?movie=${item}`)
      const data = await res.json()
      if (!data) {
        return {response: []}
      }
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  const addItem = async (item: string) => {
    setValue('')
    const itemID = item.split('#')[1].trim()
    setSearchResults([])
    setLoading(true)
    try {
      const res = await fetch(`/dashboard/movies/api/add`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          movieID: itemID
        }),
      })
      const data = await res.json()
      if (data.error) {
        notifications.show({
          title: `Error`,
          message: `${item.split('(')[0].trim()} is already in your list`,
          icon: <IconX />,
          color: 'red',
        })
        setLoading(false)
      }
      else {
        notifications.show({
          title: `List updated`,
          message: `${value.split('(')[0].trim()} has been added to your list`,
          icon: <IconCheck />,
          color: 'green',
        })
        setItems(data.response)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (value) {
      itemSearch(value).then(data => {
        if (data.response) {
          setSearchResults(data.response.map((item: any) => item.title + " #" + item.id));
        } else {
          setSearchResults([]);
        }
      }).catch(err => {
        console.error(err);
        setSearchResults([]);
      });
    } else {
      setSearchResults([]);
    }
  }, [value])
    
  const isMobile = useMediaQuery(`(max-width: 1500px)`);

  return (
    <Container w="100%">
      <Group justify='center'>
        <Autocomplete 
          w={isMobile ? '75%' : '300px'}
          placeholder="Search for a movie"   
          data = {searchResults}
          value={value}
          onChange={setValue}
          onOptionSubmit={() => setSelected(false)}
        />
        <Tooltip label="Add to list" position='bottom'>
        <ActionIcon 
          size="input-sm" 
          variant="filled" 
          radius="md"
          disabled={selected}
          onClick={() => {
            addItem(value);
          }}
        >
        <IconPlus />
        </ActionIcon>
        </Tooltip>
        {loading && 
          <Loader />
        }
      </Group>

    </Container>
  )
}
