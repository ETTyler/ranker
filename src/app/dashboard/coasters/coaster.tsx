'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group} from '@mantine/core'
import { useEffect, useState } from 'react'
import CoasterUI from './coasterUI'
interface Props {
  coaster: string
  rank: number
  userID: string
  setCoasters: any
  listeners?: any
}

export default function Coaster({coaster, rank, userID, setCoasters, listeners}: Props) {
  const [details, setDetails] = useState<any>()

  const coasterInfo  = async (coaster: string) => {
    try {
      const res = await fetch(`/dashboard/coasters/api/coasters?coaster=${coaster}`)
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }
  const coasterData = async (coaster: string) => {
    try {
      const res = await fetch(`/dashboard/coasters/api/coastersv2?coaster=${coaster}`)
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    coasterInfo(coaster).then(data => {
      setDetails(data.response)
    })
  }, [coaster])
  
  if (!details) return <div>Loading...</div>
  
  return (
    <>
      <CoasterUI details={details} rank={rank} userID={userID} setCoasters={setCoasters} listeners={listeners}/>
    </>
  )
}
