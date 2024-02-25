import Image from 'next/image'
import styles from '../page.module.css'
import { HeaderMenu } from '../dashboard/header/header'
import Coaster from '../dashboard/components/coaster'
import { Input, Stack } from '@mantine/core'

export default function Home() {
  return (
    <>
      <HeaderMenu />
      <Stack 
        p={20}
        align="center"
        justify="flex-start"
        gap="lg"
      >
        <Input placeholder="Search for a coaster" />
        <Coaster coaster="velocicoaster" />
        <Coaster coaster="hyperion" />
        <Coaster coaster="red force" />
        <Coaster coaster="zadra" />
        <Coaster coaster="batman gotham city escape" />
        <Coaster coaster="taron" />
        <Coaster coaster="shambhala" /> 
        <Coaster coaster="nemesis" />
      </Stack>
    </>
  )
}
