import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coasterID = searchParams.get('coaster')
  const api = 'https://captaincoaster.com/api/'
  const key = process.env.API_KEY
  let response = {}

  const req = await fetch(`${api}coasters/${coasterID}`, {
    headers: {
      Authorization: key || '',
    },
  })
  
  const coasterData = await req.json()
  response  =  {
    name: coasterData.name,
    park: coasterData.park.name,
    material: coasterData.materialType.name,
    manufacturer: coasterData.manufacturer.name,
    model: coasterData.model === undefined ? coasterData.manufacturer.name : coasterData.model.name,
    rank: coasterData.rank,
    image: coasterData.mainImage.path
  }
 
  return NextResponse.json({response})
}
