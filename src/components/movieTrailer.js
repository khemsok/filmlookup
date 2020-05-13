import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";

function MovieTrailer({ videoId }) {
  const opts = {
    // height: "100%",
    width: "100%",
    maxHeight: "550px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <>
      <Youtube videoId={videoId} opts={opts} onReady={onReady} />
    </>
  );
}

export default MovieTrailer;
