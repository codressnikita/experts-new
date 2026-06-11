"use client";

import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import VideoViewer from "./components/VideoViewer";
import axios from "axios"; // Using Axios for the API call

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const PLAYLIST_ID = "PL_7V_ZbBe0voAv6_hjVnb_1362CVqE2LP";
  const API_KEY = "AIzaSyCmedAQ0QW5xgWr9fEikkAI7nKE3xYcPMc";
  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            playlistId: PLAYLIST_ID,
            maxResults: 50,
            key: API_KEY,
          },
        }
      );

      const videosData = response.data.items.map((item) => ({
        name: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        src: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }));

      setVideos(videosData);
    } catch (error) {
      console.error(
        "Failed to fetch videos:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    // Fetch the playlist once on load. Playlists rarely change, and a 24/7
    // kiosk re-polling drains the YouTube Data API quota for no benefit.
    fetchVideos();
  }, []);

  const handleVideoClick = (vid) => {
    setSelectedVideo(vid);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="flex-grow overflow-hidden">
      <Landing handleVideoClick={handleVideoClick} youtubeVideos={videos} />
      {selectedVideo && (
        <VideoViewer video={selectedVideo || {}} onClose={handleVideoClose} />
      )}
    </div>
  );
}
