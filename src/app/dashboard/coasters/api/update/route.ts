import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userID = body.userID
  const coasters = body.coasters

  const updateCoasters = await prisma.coasters.updateMany({
    where: {
      userId: userID
    },
    data: {
      topTen: coasters
    }
  })
  
  const response = coasters

  return NextResponse.json({ response })
}