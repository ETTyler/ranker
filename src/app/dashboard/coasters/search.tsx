'use client';

import { Autocomplete, ActionIcon, Group, TextInput, Container } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function Search({userID, setCoasters}: {userID: string, setCoasters: any}) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(true)
  const [searchResults, setSearchResults] = useState([])

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

  const coasterDetails  = async (coasterID: string) => {
    try {
      const res = await fetch(`/dashboard/coasters/api/coastersv2?coaster=${coasterID}`)
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
    try {
      const res = await fetch(`/dashboard/coasters/api/search`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          coasterID: coasterID
        }),
      })
      const data = await res.json()
      setCoasters(data.response)
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
    
  // add media query to this to update seach bar length
  return (
    <Container w="100%">
      <Group justify='center'>
        <Autocomplete 
          w="70%"
          placeholder="Search for a coaster"   
          data = {searchResults}
          value={value}
          onChange={setValue}
          onOptionSubmit={() => setSelected(false)}
        />
        <ActionIcon 
          size="input-sm" 
          variant="filled" 
          radius="md"
          disabled={selected}
          onClick={() => {
            addCoaster(value);
            notifications.show({
              title: `${value} added to list`,
              message: 'Rearrange list',
            })
          }
          }
        >
        <IconPlus />
        </ActionIcon>
      </Group>
    </Container>
  )
}
