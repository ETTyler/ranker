import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coaster = searchParams.get('coaster')
  const api = 'https://captaincoaster.com/api/'
  const key = '45ecc521-13cf-46b3-8fa9-da1e6e13c562'
  const headers = {
    Authorization: key,
  }
  let response = {}

  const res = await fetch(`${api}coasters?page=1&name=${coaster}`, {
    headers: headers
  })
  if (res.status !== 200) {
    return false
  }
  else {
    const data = await res.json()
    const initialResponse = data['hydra:member']
    const coasterID = initialResponse[0].id
    const req = await fetch(`${api}coasters/${coasterID}`, {
      headers: headers
    })
    const coasterData = await req.json()
    response  =  {
      name: coasterData.name,
      park: coasterData.park.name,
      material: coasterData.materialType.name,
      manufacturer: coasterData.manufacturer.name,
      model: coasterData.model.name,
      rank: coasterData.rank,
      image: coasterData.mainImage.path
    }
  }
 
  return NextResponse.json({ response })
}
