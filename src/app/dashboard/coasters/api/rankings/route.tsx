import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userID = body.userID

  const coasters = await prisma.coasters.findFirst({
    where: {
      userId: userID 
    }
  })

  let response = coasters?.topTen
 
  return NextResponse.json({ response })
}
