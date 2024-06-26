'use server'
import Image from 'next/image'
import styles from '../page.module.css'
import Coaster from './coaster' 
import { Input, Stack, Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { PrismaClient, Prisma } from '@prisma/client'

export default async function Coasters( {userID}: {userID: string}) {
  // const [coasters, setCoasters] = useState<any>()

  // const coasterRankings  = async (userID: string) => {
  //   try {
  //     const res = await fetch(`/dashboard/coasters/api/rankings`, {
  //       method: 'POST',
  //       body: JSON.stringify({userID: userID}),
  //     })
  //     const data = await res.json()
  //     return data
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   coasterRankings(userID).then(data => {
  //     setCoasters(data.response)
  //   })
  // }
  // , [userID])

  const prisma = new PrismaClient()

  const res = await prisma.coasters.findFirst({
    where: {
      userId: userID 
    }
  })

  const coasters = res?.topTen

  return (
    <>
      {Array.isArray(coasters) && coasters.map((coaster: any) => {
        return <Coaster key={coaster.rank} coaster={coaster.id} />
      })}
    </>
  )
}
