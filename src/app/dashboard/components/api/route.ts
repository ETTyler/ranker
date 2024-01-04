import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coaster = searchParams.get('coaster')
  const api = 'https://captaincoaster.com/api/'
  const key = '45ecc521-13cf-46b3-8fa9-da1e6e13c562'
  const headers = {
    Authorization: key,
  }
  const res = await fetch(`${api}coasters?page=1&name=${coaster}`, {
    headers: headers
  })
  const data = await res.json()
  const response = data['hydra:member']
 
  return NextResponse.json({ response })
}
