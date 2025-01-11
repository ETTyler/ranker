import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const movieName = searchParams.get('movie');
  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;
  let response = {};

  if (!movieName) {
    return NextResponse.json({ error: 'Movie name is required' }, { status: 400 });
  }

    // Search for movies by name
    const searchRes = await fetch(`${api}/search/movie?api_key=${key}&query=${movieName}`);
    const searchData = await searchRes.json();

    if (searchData.results && searchData.results.length > 0) {
      response = searchData.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title + " ("+movie.release_date+")",
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path,
      }));
    } else {
      return NextResponse.json({ });
    }
    return NextResponse.json({ response });
  } 
