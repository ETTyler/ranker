'use client';

import { Autocomplete, ActionIcon, Group, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import ModalForm from './modalForm';

export default function Search() {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [opened, { open, close }] = useDisclosure(false);

  const coasterSearch  = async (coaster: string) => {
    if (coaster.length < 3) return {response: []}
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

  useEffect(() => {
    coasterSearch(value).then(data => {
      setSearchResults(data.response.map((coaster: any) => coaster.value))
    })
  }, [value])
    
  return (
    <>
    <Modal opened={opened} onClose={close} title="Rankings" centered>
      <ModalForm />
    </Modal>
    <Group>
      <Autocomplete 
        w='20rem'
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
        onClick={open}
      >
        <IconPlus />
      </ActionIcon>
    </Group>
    </>
  )
}
