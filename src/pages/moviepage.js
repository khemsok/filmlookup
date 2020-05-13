import React, { useState, useEffect } from "react";
import axios from "axios";

import { numberWithCommas } from "../util/helper";
import MovieTrailer from "../components/movieTrailer";

// MUI
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";

function MoviePage({ match, handleBackgroundChange }) {
  const [movieData, setMovieData] = useState({});
  const [statusCode, setStatusCode] = useState(true);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    fetchMovieData();
  }, []);

  if ((Object.keys(movieData).length !== 0) & statusCode) {
    handleBackgroundChange(movieData.backdrop_path);
  }

  const fetchMovieData = async () => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${match.params.movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const response = await fetch(movieUrl);
    const data = await response.json();
    if (data.status_code) {
      setStatusCode(false);
    }
    setMovieData(data);
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const trailerChannel = "UCi8e0iOVk1fEOogdfu4YgfA";
    const query = data.original_title;
    const url = "https://www.googleapis.com/youtube/v3/search";

    axios
      .get(url, {
        params: {
          key: apiKey,
          channelId: trailerChannel,
          part: "snippet",
          q: `${query} trailer`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.items.length !== 0) {
          setVideoId(res.data.items[0].id.videoId);
        }
      });
  };

  const displayMovie =
    Object.keys(movieData).length === 0 ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    ) : !statusCode ? (
      <Typography variant="subtitle1" align="center">
        404 Not Found 💔
      </Typography>
    ) : (
      <>
        <Fade in={true} timeout={1000}>
          <div>
            <Typography variant="h3">
              {movieData.title.toUpperCase()}
            </Typography>
            <Typography
              style={{ marginBottom: "20px" }}
              variant="subtitle1"
              color="primary"
            >
              {movieData.tagline}
            </Typography>
          </div>
        </Fade>

        <Grid container spacing={4}>
          <Zoom in={true} direction="right" timeout={500}>
            <Grid
              item
              md={4}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                style={{ width: "100%", maxHeight: "550px" }}
                alt={movieData.title}
              />
              <Typography
                variant="subtitle1"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                {movieData.genres
                  .slice(0, 4)
                  .map((element) => element.name)
                  .join(", ")}
              </Typography>
              <Typography>
                {movieData.production_companies
                  .slice(0, 3)
                  .map((element) => element.name)
                  .join(", ")}
              </Typography>
            </Grid>
          </Zoom>
          <Fade
            in={true}
            direction="right"
            timeout={500}
            style={{ transitionDelay: "500ms" }}
          >
            <Grid item md={7} xs={12}>
              <MovieTrailer videoId={videoId} />
              <Typography variant="h4" color="primary">
                Overview
              </Typography>
              <Typography>{movieData.overview}</Typography>

              <Grid container style={{ marginTop: "25px" }}>
                <Grid item xs={6}>
                  <Typography>Original Release</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {movieData.release_date}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: "10px" }}>
                  <Typography>Run Time</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {movieData.runtime} MINS
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Box Office</Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${numberWithCommas(movieData.revenue)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Ratings</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {movieData.vote_average}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </>
    );

  return (
    <>
      <Container maxWidth="lg">{displayMovie}</Container>
    </>
  );
}
export default MoviePage;
