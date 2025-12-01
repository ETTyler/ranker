import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { getCurrentSession } from "@/auth/session";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession()

  const api = 'https://api.themoviedb.org/3';
  const key = process.env.TMDB_KEY;
    
  if (user === null) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }
  
  const { userID, showID } = await request.json();

  if (!userID || !showID) {
    return NextResponse.json({ error: 'User ID and show ID are required' }, { status: 400 });
  }

  try {
    // Fetch detailed information about the show
    const showRes = await fetch(`${api}/tv/${showID}?api_key=${key}`);
    const showData = await showRes.json();

    if (!showData) {
      return NextResponse.json({ error: 'show not found' }, { status: 404 });
    }

    // Fetch user's current top ten list
    const userShows = await prisma.shows.findUnique({
      where: { userId: userID },
    });

    if (!userShows) {
      // If the user does not have a list, create a new one
      const newShowList = await prisma.shows.create({
        data: {
          userId: userID,
          topTen: [{
            "id": Number(showID),
            "rank": 1,
            "title": showData.name,
            "release_date": showData.first_air_date,
            "overview": showData.overview,
            "poster_path": showData.poster_path,
            "network": showData.networks[0].name,
          }]
        }
      });
      const response = newShowList.topTen;
      return NextResponse.json({ response });
    }

    const isShowInList = Array.isArray(userShows?.topTen) && userShows.topTen.some((show: any) => show.id === Number(showID));

    if (isShowInList) {
      return NextResponse.json(
        { error: 'show already in list' },
        { status: 400 }
      );
    }

    // Calculate the rank of the show being added by appending it to the end or setting to 1
    const rank = Array.isArray(userShows?.topTen) ? userShows?.topTen.length + 1 : 1;

    const updatedList = Array.isArray(userShows?.topTen) ? [...userShows.topTen, {
      "id": Number(showID),
      "rank": rank,
      "title": showData.name,
      "release_date": showData.first_air_date,
      "overview": showData.overview,
      "poster_path": showData.poster_path,
      "network": showData.networks[0].name,
    }] as Prisma.JsonArray
    : [{
      "id": Number(showID),
      "rank": rank,
      "title": showData.name,
      "release_date": showData.first_air_date,
      "overview": showData.overview,
      "poster_path": showData.poster_path,
      "network": showData.networks[0].name,
    }] as Prisma.JsonArray;

    const updateShows = await prisma.shows.updateMany({
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
    return NextResponse.json({ error: 'Failed to fetch show data' }, { status: 500 });
  }
}