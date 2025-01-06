'use server';

import { Container, Flex, Text, Center } from '@mantine/core';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import CoasterUI from '@/app/components/coasterUI'
import { useMediaQuery } from '@mantine/hooks'
import { HeaderMenu } from '@/app/dashboard/header/header';

export default async function SharedRanking({ params }: { params: { userID: string } }) {
  const { userID } = params;
  const prisma = new PrismaClient()
  const api = 'https://captaincoaster.com/api/'
  const key = process.env.API_KEY
  
  const ranking = await prisma.coasters.findFirst({
    where: {
      userId: userID 
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: userID
    }
  })

  const username = user?.username

  const coasterInfo = async (coasterID: string) => {
    let response = {}
  
    const req = await fetch(`${api}coasters/${coasterID}`, {
      headers: {
        Authorization: key || '',
      },
    })
    
    const coasterData = await req.json()
    response  =  {
      name: coasterData.name,
      park: coasterData.park.name,
      material: coasterData.materialType.name === undefined ? 'N/A' : coasterData.materialType.name,
      manufacturer: coasterData.manufacturer.name === undefined ? 'N/A' : coasterData.manufacturer.name,
      model: coasterData.model === undefined ? coasterData.manufacturer.name : coasterData.model.name,
      rank: coasterData.rank === undefined ? 'N/A' : coasterData.rank,
      image: coasterData.mainImage === undefined ? false : coasterData.mainImage.path,
      id: coasterData.id
    }
    return response
  }

  const coasters: any[] = Array.isArray(ranking?.topTen) ? ranking.topTen : []

  if (!coasters) {
    notFound();
  }

  return (
    <>
    <HeaderMenu />
    <Container fluid>
      <Center>
        <Text size='xl'c='white' fw={600} mt={20} mb={10}>{username}&apos;s Ranking</Text>
      </Center>
      <Flex 
        py={10}
        px='2%'
        justify='center' 
        align='flex-start' 
        direction='row'
        wrap='wrap'
        gap='lg'
        w='fit-content'
      >
        {await Promise.all(coasters.map(async (coaster: any, index: number) => {
          const coasterDetails = await coasterInfo(coaster.id);
          return <CoasterUI key={index} details={coasterDetails} rank={index+1} />;
        }))}
      </Flex>
    </Container>
    </>
  );
}
