import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroller";

// MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

// MUI Style
import { makeStyles } from "@material-ui/core/styles";

// MUI Icon
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  cover: {
    width: 151,
  },
}));

function LatestMovieRelease() {
  const classes = useStyles();

  const [movieList, setMovieList] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);
  const [pageMax, setPageMax] = useState(-1);
  const [infiniteScrollStatus, setInfiniteScrollStatus] = useState(true);

  const fetchMovieData = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageCounter}&region=US`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    if (pageMax !== -1) {
      setPageMax(data.total_pages);
    }

    if (pageCounter <= data.total_pages) {
      setPageCounter(pageCounter + 1);
      setMovieList([...movieList, ...data.results]);
    } else {
      setInfiniteScrollStatus(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const mapMovieList = (movieListData) => {
    const mapMovies = movieListData
      .filter((data) => data.poster_path !== null)
      .map((movie, index) => {
        const movieUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        return (
          <Grid item md={4} xs={12} key={index}>
            <Card style={{ position: "relative" }}>
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardActionArea>
                  <CardMedia component="img" height="375" image={movieUrl} />
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      color: "white",
                      right: "0",
                      marginRight: "0px",
                      marginTop: "10px",
                      padding: "6px",
                      minWidth: "50px",
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      borderRadius: "0px",
                      textAlign: "center",
                    }}
                  >
                    {movie.vote_average === 0 ? (
                      <Typography variant="subtitle2">Not Yet Rated</Typography>
                    ) : (
                      <Typography variant="subtitle2">
                        <span>
                          <StarIcon
                            style={{
                              fontSize: "1em",
                              verticalAlign: "text-top",
                            }}
                            color="primary"
                          />
                        </span>{" "}
                        {movie.vote_average}/10
                      </Typography>
                    )}
                  </div>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        );
      });
    return mapMovies;
  };

  const displayMovieList =
    movieList.length === 0 ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    ) : (
      <>
        <InfiniteScroll
          loadMore={fetchMovieData}
          loader={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          }
          hasMore={infiniteScrollStatus}
        >
          <Grid container spacing={8}>
            {mapMovieList(movieList)}
          </Grid>
        </InfiniteScroll>
      </>
    );

  return (
    <>
      <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
        LATEST RELEASES
      </Typography>
      {displayMovieList}
    </>
  );
}

export default LatestMovieRelease;
