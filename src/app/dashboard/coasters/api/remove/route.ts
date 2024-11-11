import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

interface Item {
  id: number,
  rank: number
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userID = body.userID
  const coasterID = body.coasterID

  const userCoasters = await prisma.coasters.findFirst({
    where: {
      userId: userID
    },
  })

  const listItems = userCoasters?.topTen as unknown as Item[]

  const index = listItems.findIndex(item => item!.id === coasterID)
  listItems.splice(index,1)

  // the updated list is looped through and the rank is set to the index of the array + 1
  // e.g. the first item of the array at index [0] would have the rank 1
  const updatedItems = listItems.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))
  
  console.log(updatedItems)

  const updateCoasters = await prisma.coasters.updateMany({
    where: {
      userId: userID
    },
    data: {
      topTen: updatedItems
    }
  })
  
  const response = updatedItems

  return NextResponse.json({ response })
}