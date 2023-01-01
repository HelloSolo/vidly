import React, { useRef } from "react";
import useVideoPlayer from "./common/videoplayer";

import video from "../assests/intro.mp4";

const VideoApp = () => {
   const videoElement = useRef(null);

   const {
      playerState,
      togglePlay,
      toggleMute,
      handleOnTimeUpdate,
      handleVideoProgress,
      handleVideoSpeed,
      toggleFullscreen,
   } = useVideoPlayer(videoElement);

   return (
      <div className="video-container">
         <div className="video-wrapper">
            <video
               src={video}
               ref={videoElement}
               onTimeUpdate={handleOnTimeUpdate}
            />

            <div className="controls">
               <div className="actions">
                  <button onClick={togglePlay}>
                     {!playerState.isPlaying ? (
                        <i className="fa fa-play"></i>
                     ) : (
                        <i className="fa fa-pause"></i>
                     )}
                  </button>
               </div>
               <input
                  type="range"
                  min="0"
                  max="100"
                  value={playerState.progress}
                  onChange={(e) => handleVideoProgress(e)}
               />
               <select
                  className="velocity"
                  value={playerState.speed}
                  onChange={(e) => handleVideoSpeed(e)}>
                  <option value="0.50">0.5x</option>
                  <option value="1.0">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="2">2x</option>
               </select>

               <button className="mute-btn" onClick={toggleMute}>
                  {!playerState.isMuted ? (
                     <i className="fa fa-volume-up"></i>
                  ) : (
                     <i className="fa fa-volume-off"></i>
                  )}
               </button>

               <button className="mute-btn" onClick={toggleFullscreen}>
                  <i className="fa fa-expand"></i>
               </button>
            </div>
         </div>
      </div>
   );
};

export default VideoApp;
