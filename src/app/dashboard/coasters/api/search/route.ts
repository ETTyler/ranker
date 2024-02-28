import { NextRequest, NextResponse } from "next/server"

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
