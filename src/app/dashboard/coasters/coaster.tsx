'use client'
import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group} from '@mantine/core'
import { useEffect, useState } from 'react'
import CoasterUI from './coasterUI'
interface Props {
  coaster: string
}

export default function Coaster({coaster}: Props) {
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

  // const api = 'https://captaincoaster.com/api/'
  // const key = process.env.API_KEY
  //   const req = await fetch(`${api}coasters/${coaster}`, {
  //     headers: {
  //       Authorization: key || '',
  //     },
  //   })
  //   const coasterData = await req.json()
  //   const details  =  {
  //     name: coasterData.name,
  //     park: coasterData.park.name,
  //     material: coasterData.materialType.name,
  //     manufacturer: coasterData.manufacturer.name,
  //     model: coasterData.model.name,
  //     rank: coasterData.rank,
  //     image: coasterData.mainImage.path
  //   }
  
  return (
    <>
      <CoasterUI details={details} />
    </>
  )
}
