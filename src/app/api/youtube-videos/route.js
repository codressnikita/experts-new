import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = "AIzaSyBHSv6fT10HfnWHE1NoZhP0j_rU3QV385I";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("playlistId");

  if (!playlistId) {
    return NextResponse.json(
      { error: "Playlist ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId,
          maxResults: 50,
          key: API_KEY,
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      name: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      src: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }));

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("YouTube API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
