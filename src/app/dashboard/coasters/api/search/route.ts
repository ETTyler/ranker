import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentSession } from "@/auth/session"

const prisma = new PrismaClient()

// This route is used to search for coasters by name through the external API and returns the results
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coaster = searchParams.get('coaster')
  const api = 'https://captaincoaster.com/api/'
  const key = process.env.API_KEY
  let response = {}

  const res = await fetch(`${api}coasters?page=1&name=${coaster}`, {
    headers: {
      Authorization: key || '', 
    },
  })

  if (res.status !== 200) {
    return NextResponse.json({ message: "Error" }, { status: 500 })
  }
  else {
    const data = await res.json()
    const initialResponse = data['member']
    const coasters = initialResponse.map((coaster: any) => {
      return {
        value: coaster.name + ' (' + coaster.park.name + ')',
        id: coaster.id,
        name: coaster.name,
        park: coaster.park.name,
      }
    })
    const uniqueCoasters = coasters.filter((coaster: any, index: number, self: any) =>
      index === self.findIndex((t: any) => (
        t.name === coaster.name && t.park === coaster.park)))
    response = uniqueCoasters
  }
  return NextResponse.json({ response })
}

// This route is used to add a coaster to the user's top ten list
export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()
  
  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const userID = body.userID
  const coasterID = body.coasterID

  const userCoasters = await prisma.coasters.findFirst({
    where: {
      userId: userID
    },
  })

  if (userCoasters === null) {
    const newCoasterList = await prisma.coasters.create({
      data: {
        userId: userID,
        topTen: [{
          "id": Number(coasterID),
          "rank": 1
        }]
      }
    })
    const response = newCoasterList.topTen
    return NextResponse.json({ response })
  }

  const isCoasterInList = Array.isArray(userCoasters?.topTen) && userCoasters.topTen.some((coaster: any) => coaster.id === Number(coasterID))

  if (isCoasterInList) {
    return NextResponse.json(
      { error: 'Coaster already in list' },
      { status: 400 }
    )
  }

  // calculates the rank of the coaster being added by appending it to the end or setting to 1
  const rank = Array.isArray(userCoasters?.topTen) ? userCoasters?.topTen.length + 1 : 1;

  const updatedList = Array.isArray(userCoasters?.topTen) ? [...userCoasters.topTen, {
    "id": Number(coasterID),
    "rank": rank
  }] as Prisma.JsonArray
  : [{
    "id": Number(coasterID),
    "rank": rank
  }] as Prisma.JsonArray


  const updateCoasters = await prisma.coasters.updateMany({
    where: {
      userId: userID
    },
    data: {
      topTen: updatedList
    }
  })
  
  const response = updatedList

  return NextResponse.json({ response })
}