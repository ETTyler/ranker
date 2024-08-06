'use server'

import Image from 'next/image'
import styles from '../page.module.css'
import { HeaderMenu } from '../dashboard/header/header'
import Coaster from './coasters/coaster'
import Dash from '../dashboard/dash'
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
      <Dash>
        <Coasters userID={user ? user.id : ''} />
      </Dash>
    </>
  )
}
