'use client';

import Image from 'next/image'
import styles from '../page.module.css'
import { Stack, Paper, Text } from '@mantine/core'
import { useEffect, useState } from 'react'


export default function Coaster() {
  const [details, setDetails] = useState(null)

  const coasterInfo  = async (coaster: string) => {
    try {
      console.log('fetching')
      const res = await fetch(`/dashboard/components/api?coaster=${coaster}`)
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    coasterInfo('velocicoaster').then(data => {
      setDetails(data.response[0])
    })
  }, [])
  
  if (!details) return <div>Loading...</div>
  
  return (
    <>
      <Stack gap={20} p={20} align='center'>
        <Paper shadow="xs" p="xl">
          <Text>{details.name}</Text>
          <Text>
            {details.park.name}
          </Text>
        </Paper>
        <Paper shadow="xs" p="xl">
          <Text>Paper is the most basic ui component</Text>
          <Text>
             Use it to create cards, dropdowns, modals and other components that require background
            with shadow
          </Text>
        </Paper>
        <Paper shadow="xs" p="xl">
          <Text>Paper is the most basic ui component</Text>
          <Text>
             Use it to create cards, dropdowns, modals and other components that require background
            with shadow
          </Text>
        </Paper>
        <Paper shadow="xs" p="xl">
          <Text>Paper is the most basic ui component</Text>
          <Text>
             Use it to create cards, dropdowns, modals and other components that require background
            with shadow
          </Text>
        </Paper>
      </Stack>
    </>
  )
}
