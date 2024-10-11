import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

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
  });
  if (res.status !== 200) {
    return false
  }
  else {
    const data = await res.json()
    const initialResponse = data['hydra:member']
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

export async function POST(request: NextRequest) {
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