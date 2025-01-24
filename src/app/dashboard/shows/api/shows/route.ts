import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const showId = searchParams.get('id');
  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;
  let response = {};

  if (!showId) {
    return NextResponse.json({ error: 'Show ID is required' }, { status: 400 });
  }

  try {
    // Fetch detailed information about the show
    const showRes = await fetch(`${api}/tv/${showId}?api_key=${key}`);
    const showData = await showRes.json();

    if (showData) {
      response = {
        title: showData.name,
        network: showData.networks[0].name,
        release_date: showData.first_air_date,
        overview: showData.overview,
        poster_path: showData.poster_path,
        id: showData.id,
      };
    } else {
      return NextResponse.json({ error: 'Show not found' }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch show data' }, { status: 500 });
  }

  return NextResponse.json({ response });
}