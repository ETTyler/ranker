import Image from 'next/image'
import styles from '../page.module.css'
import { Stack, Paper, Text } from '@mantine/core'

export default function Coaster() {
  return (
    <>
      <Stack gap={20} p={20} align='center'>
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
