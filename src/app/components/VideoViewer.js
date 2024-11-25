import React, { useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import ReactPlayer from "react-player";
import BackButtons from "./BackButtons";

const VideoViewer = ({ video, onClose }) => {
  const { setScreensaverDisabled } = useScreensaverContext();

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Clean up on component unmount: re-enable screensaver
    return () => {
      setScreensaverDisabled(false);
    };
  }, [setScreensaverDisabled]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full bg-black">
        <div
          className="flex-grow overflow-hidden"
          style={{ maxHeight: "calc(100vh)" }}
        >
          {/* Block YouTube logo */}
          <div className="youtube-logo-blocker"></div>

          {/* Block clickable header */}
          <div className="youtube-header-blocker flex justify-start p-4">
            {video.name}
          </div>
          <ReactPlayer
            url={video.src} // Pass YouTube URL
            playing // AutoPlay video
            controls // Enable playback controls
            onEnded={onClose} // Close modal when video ends
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  modestBranding: 1, // Removes YouTube logo
                  rel: 0, // Disables related videos at the end
                  fs: 0, // Disables fullscreen button
                  showInfo: 0, // Hides video title and uploader header
                  disableKb: 1, // Disables keyboard controls
                  iv_load_policy: 3, // Hides annotations
                  origin: window.location.origin,
                },
              },
            }}
          />
        </div>
      </div>
      <BackButtons onBack={onClose} onHome={onClose} />
    </Modal>
  );
};

export default VideoViewer;
