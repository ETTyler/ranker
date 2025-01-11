import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { getCurrentSession } from "@/auth/session";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()
    
  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }
  
  const { userID, movieID } = await request.json();
  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;

  if (!userID || !movieID) {
    return NextResponse.json({ error: 'User ID and Movie ID are required' }, { status: 400 });
  }

  try {
    // Fetch detailed information about the movie
    const movieRes = await fetch(`${api}/movie/${movieID}?api_key=${key}`);
    const movieData = await movieRes.json();

    if (!movieData) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    // Fetch credits to get the director information
    const creditsRes = await fetch(`${api}/movie/${movieID}/credits?api_key=${key}`);
    const creditsData = await creditsRes.json();
    const director = creditsData.crew.find((member: any) => member.job === 'Director');

    // Fetch user's current top ten list
    const userMovies = await prisma.movies.findUnique({
      where: { userId: userID },
    });

    if (!userMovies) {
      // If the user does not have a list, create a new one
      const newMovieList = await prisma.movies.create({
        data: {
          userId: userID,
          topTen: [{
            "id": Number(movieID),
            "rank": 1,
            "title": movieData.title,
            "release_date": movieData.release_date,
            "overview": movieData.overview,
            "poster_path": movieData.poster_path,
            "director": director ? director.name : 'N/A',
          }]
        }
      });
      const response = newMovieList.topTen;
      return NextResponse.json({ response });
    }

    const isMovieInList = Array.isArray(userMovies?.topTen) && userMovies.topTen.some((movie: any) => movie.id === Number(movieID));

    if (isMovieInList) {
      return NextResponse.json(
        { error: 'Movie already in list' },
        { status: 400 }
      );
    }

    // Calculate the rank of the movie being added by appending it to the end or setting to 1
    const rank = Array.isArray(userMovies?.topTen) ? userMovies?.topTen.length + 1 : 1;

    const updatedList = Array.isArray(userMovies?.topTen) ? [...userMovies.topTen, {
      "id": Number(movieID),
      "rank": rank,
      "title": movieData.title,
      "release_date": movieData.release_date,
      "overview": movieData.overview,
      "poster_path": movieData.poster_path,
      "director": director ? director.name : 'N/A',
    }] as Prisma.JsonArray
    : [{
      "id": Number(movieID),
      "rank": rank,
      "title": movieData.title,
      "release_date": movieData.release_date,
      "overview": movieData.overview,
      "poster_path": movieData.poster_path,
      "director": director ? director.name : 'N/A',
    }] as Prisma.JsonArray;

    const updateMovies = await prisma.movies.updateMany({
      where: {
        userId: userID
      },
      data: {
        topTen: updatedList
      }
    });

    const response = updatedList;

    return NextResponse.json({ response });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 });
  }
}