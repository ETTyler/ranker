import Image from 'next/image'
import styles from '../page.module.css'
import { HeaderMenu } from '../dashboard/header/header'
import Coaster from './coasters/coaster'
import { Input, Stack, Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'
import Search from './coasters/search';
import Coasters from './coasters/coasters'
import { cookies } from 'next/headers'
import { lucia, validateRequest } from '../../auth'

export default async function Home() {
  const { user } = await validateRequest();
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
        <Coasters userID={user ? user.id : ''} />
      </Stack>
    </>
  )
}
