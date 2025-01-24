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

  const user = await prisma.user.findUnique({
    where: {
      id: userID
    }
  })

  const username = user?.username

  const coasterInfo = async (coasterID: string) => {
    const ranking = await prisma.coasters.findFirst({
      where: {
        userId: userID 
      }
    })
    const response = Array.isArray(ranking?.topTen) ? ranking.topTen : []
    return response
  }

  const moviesInfo = async (userID: string) => {
    const ranking = await prisma.movies.findFirst({
      where: {
        userId: userID 
      }
    })
    
    const response = Array.isArray(ranking?.topTen) ? ranking.topTen : []
    return response
  }

  const showsInfo = async (userID: string) => {
    const ranking = await prisma.shows.findFirst({
      where: {
        userId: userID 
      }
    })
    
    const response = Array.isArray(ranking?.topTen) ? ranking.topTen : []
    return response
  }

  const coasters = await coasterInfo(userID)
  const movies = await moviesInfo(userID)
  const shows = await showsInfo(userID)

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
          <TabsTab value="shows">TV Shows</TabsTab>
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
              return <CoasterUI key={index} details={coaster} rank={index+1} />;
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

        <TabsPanel value="shows" py="md">
        <Flex 
            py={10}
            justify='center'
            align='flex-start' 
            direction='column'
            wrap='wrap'
          >
            {await Promise.all(shows.map(async (show: any, index: number) => {
              return <MovieUI key={index} item={show} rank={index+1} />;
            }))}
          </Flex>
        </TabsPanel>
      </Tabs>
    </Container>
    </>
  );
}
