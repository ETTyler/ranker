import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentSession } from "@/auth/session"

const prisma = new PrismaClient()

interface Item {
  id: number,
  rank: number
}

export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()
  
  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }
  
  const body = await request.json()
  const userID = body.userID
  const showID = body.showID

  const userShows = await prisma.shows.findFirst({
    where: {
      userId: userID
    },
  })

  const listItems = userShows?.topTen as unknown as Item[]

  const index = listItems.findIndex(item => item!.id === showID)
  listItems.splice(index,1)

  // the updated list is looped through and the rank is set to the index of the array + 1
  // e.g. the first item of the array at index [0] would have the rank 1
  const updatedItems = listItems.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))

  const updateShows = await prisma.shows.updateMany({
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