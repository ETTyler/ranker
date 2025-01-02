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