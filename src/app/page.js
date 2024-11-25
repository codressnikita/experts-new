"use client";
import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import VideoViewer from "./components/VideoViewer";

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const PLAYLIST_ID = "PL_7V_ZbBe0voAv6_hjVnb_1362CVqE2LP";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `/api/youtube-videos?playlistId=${PLAYLIST_ID}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (vid) => {
    setSelectedVideo(vid);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  console.log(videos);

  return (
    <div className="flex-grow overflow-hidden">
      <Landing handleVideoClick={handleVideoClick} youtubeVideos={videos} />
      {selectedVideo && (
        <VideoViewer video={selectedVideo || {}} onClose={handleVideoClose} />
      )}
    </div>
  );
}
