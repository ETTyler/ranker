'use client'
import Coaster from './coaster' 
import { Input, Stack, Autocomplete, Container } from '@mantine/core'
import { useEffect, useState } from 'react'
import Search from './search'
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMediaQuery } from '@mantine/hooks'

export default function Coasters( {userID}: {userID: string}) {
  const [coasters, setCoasters] = useState<any[]>([])

  const coasterRankings = async (userID: string) => {
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

  const updateCoasterRanks = async (updatedCoasters: any[]) => {
    try {
      const res = await fetch(`/dashboard/coasters/api/update`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          coasters: updatedCoasters
        }),
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = coasters.findIndex((coaster) => coaster.rank === active.id);
      const newIndex = coasters.findIndex((coaster) => coaster.rank === over.id);

      const newItems = arrayMove(coasters, oldIndex, newIndex);
      const updatedCoasters = newItems.map((coaster: any, index: number) => ({
        ...coaster,
        rank: index + 1,
      }));

      setCoasters(newItems);
      updateCoasterRanks(updatedCoasters);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    }),
    useSensor(TouchSensor)
  )

  if (!coasters) return <Search userID={userID} setCoasters={setCoasters} />;

  return (
    <>
      <Stack gap="lg" justify="center">
        <Search userID={userID} setCoasters={setCoasters} />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={coasters.map((coaster) => coaster.rank)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {coasters.map((coaster, index) => (
                <SortableItem key={coaster.rank} coaster={coaster} index={index} userID={userID} setCoasters={setCoasters} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Stack>
    </>
  );
}

const SortableItem = ({ coaster, index, userID, setCoasters }: { coaster: any, index: number, userID: string, setCoasters: any }) =>{
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: coaster.rank });
  const isMobile = useMediaQuery(`(max-width: 800px)`);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...(isMobile ? {} : listeners)}>
      <Coaster 
        key={coaster.rank} 
        coaster={coaster.id} 
        rank={index+1} 
        userID={userID} 
        setCoasters={setCoasters} 
        listeners={isMobile ? listeners : undefined}  
      />
    </div>
  );
}
