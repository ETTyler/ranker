import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const movieId = searchParams.get('id');
  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;
  let response = {};

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  try {
    // Fetch detailed information about the movie
    const movieRes = await fetch(`${api}/movie/${movieId}?api_key=${key}`);
    const movieData = await movieRes.json();

    if (movieData) {
      // Fetch credits to get the director information
      const creditsRes = await fetch(`${api}/movie/${movieId}/credits?api_key=${key}`);
      const creditsData = await creditsRes.json();
      const director = creditsData.crew.find((member: any) => member.job === 'Director');

      response = {
        title: movieData.title,
        director: director ? director.name : 'N/A',
        release_date: movieData.release_date,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
        id: movieData.id,
      };
    } else {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 });
  }

  return NextResponse.json({ response });
}