"use client";
import Image from 'next/image'
import styles from '../page.module.css'
import Coaster from './coaster' 
import { Input, Stack, Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'

export default function Coasters() {
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

  const userID = "skmss5jsmwgbhzc"
  useEffect(() => {
    coasterRankings(userID).then(data => {
      setCoasters(data.response)
    })
  }
  , [])

  return (
    <>
      {coasters && coasters.map((coaster: any) => {
        console.log(coaster.rank)
        return <Coaster key={coaster.rank} coaster={coaster.id} />
      }
      )}
    </>
  )
}
