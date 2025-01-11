import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getCurrentSession } from "@/auth/session"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()

  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const userID = body.userID
  const items = body.items

  const updateMovies = await prisma.movies.updateMany({
    where: {
      userId: userID
    },
    data: {
      topTen: items
    }
  })
  
  const response = items

  return NextResponse.json({ response })
}