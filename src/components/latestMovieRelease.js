import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroller";

// MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

// MUI Styles
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
  const [open, setOpen] = useState(false);
  const [currentMovieSelect, setCurrentMovieSelect] = useState({});
  const [pageCounter, setPageCounter] = useState(1);
  const [pageMax, setPageMax] = useState(-1);
  const [infiniteScrollStatus, setInfiniteScrollStatus] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async (movieId) => {
    setOpen(true);
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=67dd87ea202627ab42b62941829e7dec&language=en-US`;

    const response = await fetch(movieUrl);
    const data = await response.json();

    setCurrentMovieSelect(data);
  };

  const fetchMovieData = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=67dd87ea202627ab42b62941829e7dec&language=en-US&page=${pageCounter}&region=US`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    if (pageMax !== -1) {
      setPageMax(data.total_pages);
    }

    if (pageCounter < data.total_pages) {
      setPageCounter(pageCounter + 1);
      setMovieList(movieList.concat(data["results"]));
    } else {
      setInfiniteScrollStatus(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  const handleClick = () => {};

  const mapMovieList = (movieListData) => {
    const mapMovies = movieListData.map((movie, index) => {
      if (movie.poster_path === null) {
        // Do not display movie without poster
        return;
      }
      const movieUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

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
                    marginRight: "20px",
                    marginTop: "20px",
                    padding: "5px",
                    minWidth: "50px",
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  {movie.vote_average === 0 ? (
                    <Typography>Not Yet Rated</Typography>
                  ) : (
                    <Typography>
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
        Latest Movie Release
      </Typography>
      {displayMovieList}
    </>
  );
}

export default LatestMovieRelease;
