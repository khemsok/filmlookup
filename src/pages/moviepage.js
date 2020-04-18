import React, { useState, useEffect } from "react";

import { numberWithCommas } from "../util/helper";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function MoviePage({ match, handleBackgroundChange }) {
  const [movieData, setMovieData] = useState({});

  console.log(handleBackgroundChange);

  useEffect(() => {
    fetchMovieData();
  }, []);

  if (Object.keys(movieData).length !== 0) {
    handleBackgroundChange(movieData.backdrop_path);
  }

  const fetchMovieData = async () => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${match.params.movieid}?api_key=67dd87ea202627ab42b62941829e7dec&language=en-US`;
    const response = await fetch(movieUrl);
    const data = await response.json();
    setMovieData(data);
  };

  const displayMovie =
    Object.keys(movieData).length === 0 ? (
      <CircularProgress />
    ) : (
      <>
        <Grid container spacing={4}>
          <Grid
            item
            md={5}
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
              style={{ width: "100%", maxHeight: "550px" }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography variant="h3">
              {movieData.title.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {movieData.tagline}
            </Typography>
            <Typography>{movieData.overview}</Typography>
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
            <Grid container style={{ marginTop: "25px" }}>
              <Grid item xs={12} md={6}>
                <Typography>Original Release</Typography>
                <Typography variant="subtitle1" color="primary">
                  {movieData.release_date}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Run Time</Typography>
                <Typography variant="subtitle1" color="primary">
                  {movieData.runtime} MINS
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Box Office</Typography>
                <Typography variant="subtitle1" color="primary">
                  ${numberWithCommas(movieData.revenue)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Ratings</Typography>
                <Typography variant="subtitle1" color="primary">
                  {movieData.vote_average}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  console.log(movieData);

  return (
    <>
      <Container maxWidth="md">{displayMovie}</Container>
    </>
  );
}
export default MoviePage;
