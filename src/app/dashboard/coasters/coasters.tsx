"use client";
import Image from 'next/image'
import styles from '../page.module.css'
import Coaster from './coaster' 
import { Input, Stack, Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'

export default function Coasters( {userID}: {userID: string}) {
  const [coasters, setCoasters] = useState<any>()

  const coasterRankings  = async (userID: string) => {
    try {
      const res = await fetch(`/dashboard/coasters/api/rankings`, {
        method: 'POST',
        body: JSON.stringify({userID: userID}),
      })
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    coasterRankings(userID).then(data => {
      setCoasters(data.response)
    })
  }
  , [userID])

  return (
    <>
      {coasters && coasters.map((coaster: any) => {
        return <Coaster key={coaster.rank} coaster={coaster.id} />
      }
      )}
    </>
  )
}
