import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const showName = searchParams.get('show');
  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;
  let response = {};

  if (!showName) {
    return NextResponse.json({ error: 'Show name is required' }, { status: 400 });
  }

    // Search for shows by name
    const searchRes = await fetch(`${api}/search/tv?api_key=${key}&query=${showName}`);
    const searchData = await searchRes.json();

    if (searchData.results && searchData.results.length > 0) {
      response = searchData.results.map((show: any) => ({
        id: show.id,
        title: show.name + " ("+show.first_air_date+")",
        release_date: show.release_date,
        overview: show.overview,
        poster_path: show.poster_path,
      }));
    } else {
      return NextResponse.json({ });
    }
    return NextResponse.json({ response });
  } 
