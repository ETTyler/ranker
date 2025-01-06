'use client';

import { Autocomplete, ActionIcon, Group, Container, Tooltip, Loader, Center } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';

export default function Search({userID, setCoasters}: {userID: string, setCoasters: any}) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const coasterSearch  = async (coaster: string) => {
    if (coaster.length < 1) return {response: []}
    try {
      const res = await fetch(`/dashboard/coasters/api/search?coaster=${coaster}`)
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  const addCoaster = async (coaster: string) => {
    setValue('')
    const coasterID = coaster.split('#')[1].trim()
    setLoading(true)
    try {
      const res = await fetch(`/dashboard/coasters/api/search`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          coasterID: coasterID
        }),
      })
      const data = await res.json()
      if (data.error) {
        notifications.show({
          title: `Error`,
          message: `${coaster.split('(')[0].trim()} is already in your list`,
          icon: <IconX />,
          color: 'red',
        })
      }
      else {
        notifications.show({
          title: `List updated`,
          message: `${value.split('(')[0].trim()} has been added to your list`,
          icon: <IconCheck />,
          color: 'green',
        })
        setCoasters(data.response)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    coasterSearch(value).then(data => {
      setSearchResults(data.response.map((coaster: any) => coaster.value + " #" + coaster.id))
    })
  }, [value])
    
  const isMobile = useMediaQuery(`(max-width: 1100px)`);

  return (
    <Container w="100%">
      <Group justify='center'>
        <Autocomplete 
          w={isMobile ? '75%' : '50%'}
          placeholder="Search for a coaster"   
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
            addCoaster(value);
          }}
        >
        <IconPlus />
        </ActionIcon>
        </Tooltip>
      </Group>
      {loading &&
        <Center pt={10}>
          <Loader />
        </Center>
      }
    </Container>
  )
}
