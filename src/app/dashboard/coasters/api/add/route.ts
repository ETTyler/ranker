import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentSession } from "@/auth/session"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()
  
  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const api = 'https://captaincoaster.com/api/'
  const key = process.env.API_KEY

  const body = await request.json()
  const userID = body.userID
  const coasterID = body.coasterID

  if (!userID || !coasterID) {
    return NextResponse.json({ error: 'User ID and Coaster ID are required' }, { status: 400 });
  }

  try {
    const req = await fetch(`${api}coasters/${coasterID}`, {
      headers: {
        Authorization: key || '',
      },
    })

    const coasterData = await req.json();

    if (!coasterData) {
      return NextResponse.json({ error: 'Coaster not found' }, { status: 404 });
    }

    // Fetch user's current top ten list
    const userCoasters = await prisma.coasters.findUnique({
      where: { userId: userID },
    })

    if (!userCoasters) {
      // If the user does not have a list, create a new one
      const newCoasterList = await prisma.movies.create({
        data: {
          userId: userID,
          topTen: [{
            "id": Number(coasterID),
            "rank": 1,
            "name": coasterData.name,
            "park": coasterData.park.name,
            "material": coasterData.materialType.name === undefined ? 'N/A' : coasterData.materialType.name,
            "manufacturer": coasterData.manufacturer.name === undefined ? 'N/A' : coasterData.manufacturer.name,
            "model": coasterData.model === undefined ? coasterData.manufacturer.name : coasterData.model.name,
            "rank": coasterData.rank === undefined ? 'N/A' : coasterData.rank,
            "image": coasterData.mainImage === undefined ? false : coasterData.mainImage.path,
          }]
        }
      });
      const response = newMovieList.topTen;
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
      "rank": rank,
      "name": coasterData.name,
      "park": coasterData.park.name,
      "material": coasterData.materialType.name === undefined ? 'N/A' : coasterData.materialType.name,
      "manufacturer": coasterData.manufacturer.name === undefined ? 'N/A' : coasterData.manufacturer.name,
      "model": coasterData.model === undefined ? coasterData.manufacturer.name : coasterData.model.name,
      "rank": coasterData.rank === undefined ? 'N/A' : coasterData.rank,
      "image": coasterData.mainImage === undefined ? false : coasterData.mainImage.path,
    }] as Prisma.JsonArray
    : [{
      "id": Number(coasterID),
      "rank": rank,
      "name": coasterData.name,
      "park": coasterData.park.name,
      "material": coasterData.materialType.name === undefined ? 'N/A' : coasterData.materialType.name,
      "manufacturer": coasterData.manufacturer.name === undefined ? 'N/A' : coasterData.manufacturer.name,
      "model": coasterData.model === undefined ? coasterData.manufacturer.name : coasterData.model.name,
      "rank": coasterData.rank === undefined ? 'N/A' : coasterData.rank,
      "image": coasterData.mainImage === undefined ? false : coasterData.mainImage.path,
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
  catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch coaster data' }, { status: 500 });
  }
}
