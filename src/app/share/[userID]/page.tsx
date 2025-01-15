'use server';

import { Container, Flex, Text, Center } from '@mantine/core';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import CoasterUI from '@/app/components/coasterUI'
import MovieUI from '@/app/components/movieUI'
import { useMediaQuery } from '@mantine/hooks'
import { HeaderMenu } from '@/app/dashboard/header/header';
import { Tabs, TabsPanel, TabsList, TabsTab } from '@mantine/core'

export default async function SharedRanking({ params }: { params: { userID: string } }) {
  const { userID } = params;
  const prisma = new PrismaClient()
  const api = 'https://captaincoaster.com/api/'
  const key = process.env.API_KEY

  const user = await prisma.user.findUnique({
    where: {
      id: userID
    }
  })

  const username = user?.username
  
  const ranking = await prisma.coasters.findFirst({
    where: {
      userId: userID 
    }
  })

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

  const moviesInfo = async (userID: string) => {
    const ranking = await prisma.movies.findFirst({
      where: {
        userId: userID 
      }
    })
    
    const response = Array.isArray(ranking?.topTen) ? ranking.topTen : []
    return response
  }

  const movies = await moviesInfo(userID)

  if (!coasters && !movies) {
    notFound();
  }

  return (
    <>
    <Container fluid>
      <Center>
        <Text size='xl'c='white' fw={600} mt={20} mb={10}>{username}&apos;s Ranking</Text>
      </Center>
      <Tabs variant='default' defaultValue="coasters">
        <TabsList>
          <TabsTab value="coasters">Coasters</TabsTab>
          <TabsTab value="movies">Movies</TabsTab>
        </TabsList>
      
        <TabsPanel value="coasters" py="md">
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
        </TabsPanel>
      
        <TabsPanel value="movies" py="md">
        <Flex 
            py={10}
            justify='center'
            align='flex-start' 
            direction='column'
            wrap='wrap'
          >
            {await Promise.all(movies.map(async (movie: any, index: number) => {
              return <MovieUI key={index} item={movie} rank={index+1} />;
            }))}
          </Flex>
        </TabsPanel>
      </Tabs>
    </Container>
    </>
  );
}
