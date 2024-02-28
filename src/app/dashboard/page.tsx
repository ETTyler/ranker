'use client';

import Image from 'next/image'
import styles from '../page.module.css'
import { HeaderMenu } from '../dashboard/header/header'
import Coaster from './coasters/coaster'
import { Input, Stack, Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'
import Search from './coasters/search';

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
        <Search />
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
