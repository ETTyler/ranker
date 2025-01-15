'use client'
import { CopyButton, Stack, Button, Center } from '@mantine/core'
import { useEffect, useState } from 'react'
import Search from './search'
import Movie from './movie'
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMediaQuery } from '@mantine/hooks'
import { IconShare3 } from '@tabler/icons-react';

export default function Movies( {userID}: {userID: string}) {
  const [items, setItems] = useState<any[]>([])
  const [width, setWidth] = useState(0)
  const [url, setUrl] = useState('')

  const rankings = async (userID: string) => {
    try {
      const res = await fetch(`/dashboard/movies/api/rankings`, {
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

  const updateList = async (updatedList: any[]) => {
    try {
      const res = await fetch(`/dashboard/movies/api/update`, {
        method: 'POST',
        body: JSON.stringify({
          userID: userID,
          items: updatedList
        }),
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    rankings(userID).then(data => {
      setItems(data.response)
    })
    setUrl(window.location.origin)
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }
  , [userID])

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.rank === active.id);
      const newIndex = items.findIndex((item) => item.rank === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      const updatedMovies = newItems.map((items: any, index: number) => ({
        ...items,
        rank: index + 1,
      }));

      setItems(newItems);
      updateList(updatedMovies);
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

  if (!items) return <Search userID={userID} setItems={setItems} />;

  return (
    <>
      <Stack gap="lg" justify="center">
      <CopyButton value={`${url}/share/${userID}`}>
          {({ copied, copy }) => (
            <Center>
              <Button color={copied ? 'teal' : 'blue'} onClick={copy} >
                {copied ? 'Copied url' : 'Share your list'} 
                <IconShare3 size={16} style={{marginLeft: '5px'}} />
              </Button>
            </Center>
          )}
        </CopyButton>
        <Search userID={userID} setItems={setItems} />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((item) => item.rank)}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {items.map((item, index) => (
                <SortableItem key={item.rank} item={item} index={index} userID={userID} setItems={setItems} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Stack>
    </>
  );
}

const SortableItem = ({ item, index, userID, setItems }: { item: any, index: number, userID: string, setItems: any }) =>{
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.rank });
  const isMobile = useMediaQuery(`(max-width: 800px)`);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...(isMobile ? {} : listeners)}>
      <Movie
        key={item.rank} 
        item={item} 
        rank={index+1} 
        userID={userID} 
        setItems={setItems} 
        listeners={isMobile ? listeners : undefined}  
      />
    </div>
  );
}
