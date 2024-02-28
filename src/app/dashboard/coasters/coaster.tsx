'use client';

import { Stack, Paper, Text, Image, Card, Flex, Badge, Button, Group} from '@mantine/core'
import { useEffect, useState } from 'react'

interface Props {
  coaster: string
}


export default function Coaster( {coaster}: Props) {
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
  
  useEffect(() => {
    coasterInfo(coaster).then(data => {
      setDetails(data.response)
    })
  }, [coaster])
  
  if (!details) return <div>Loading...</div>
  
  return (
    <>
    <Card shadow="sm" padding="lg" radius="md" miw='30vw' withBorder>
      <Group justify="space-between"  mb="xs">
        <Text fw={500}>{details.name} - {details.park}</Text>
        <Badge color="blue">#{details.rank}</Badge>
      </Group>
      <Text size="md" c="dimmed" mb='md'>
        {details.model}
      </Text>
      <Card.Section >
      <Image
          radius="md"
          src={`https://pictures.captaincoaster.com/1440x1440/${details.image}`}
          alt={details.name}
          height={300}
        />
      </Card.Section>
    </Card>
    </>
  )
}
