'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import Coaster from './coaster' 
import { Input, Stack, Autocomplete, Container } from '@mantine/core'
import { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { PrismaClient, Prisma } from '@prisma/client'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import Search from './search'

export default function Coasters( {userID}: {userID: string}) {
  const [coasters, setCoasters] = useState<any[]>([])

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


  // Updates an array showing the order the user has put the coasters in, save this to the database

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
  
    const items = reorder(coasters, result.source.index, result.destination.index);
    setCoasters(items);
  };


  return (
    <>
    <Search userID={userID} setCoasters={setCoasters} />
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Stack gap="sm" {...provided.droppableProps} ref={provided.innerRef}>
            {coasters.map((coaster, index) => (
              <Draggable key={coaster.rank} draggableId={coaster.rank.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Coaster key={coaster.rank} coaster={coaster.id} rank={coaster.rank}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
    </>
  )
}
