import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentSession } from "@/auth/session"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userID = body.userID

  const shows = await prisma.shows.findFirst({
    where: {
      userId: userID 
    }
  })

  const response = shows?.topTen
 
  return NextResponse.json({ response })
}
