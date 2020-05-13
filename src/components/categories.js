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
import Fade from "@material-ui/core/Fade";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// MUI Icon
import StarIcon from "@material-ui/icons/Star";

function Categories() {
  const [sortByItem, setSortByItem] = useState("popular");
  const [movieList, setMovieList] = useState([]);
  const [infiniteScrollStatus, setInfiniteScrollStatus] = useState(true);
  const [transitionStatus, setTransitionStatus] = useState(true);

  const handleChange = (event) => {
    setSortByItem(event.target.value);
    setTransitionStatus(false);
    setMovieList([]);
  };

  const fetchMovieDataSortBy = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${sortByItem}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    setMovieList(data.results);
    setTransitionStatus(true);
    setInfiniteScrollStatus(true);
  };

  const fetchMovieData = async (page) => {
    const pageToUse = page === undefined ? 1 : page;
    const apiUrl = `https://api.themoviedb.org/3/movie/${sortByItem}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageToUse}&region=US`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (pageToUse <= data.total_pages) {
      setMovieList([...movieList, ...data.results]);
    }

    if (pageToUse === data.total_pages) {
      setInfiniteScrollStatus(false);
    }
  };

  useEffect(() => {
    fetchMovieDataSortBy();
  }, [sortByItem]);

  const mapMovieList = (movieListData) => {
    const mapMovies = movieListData
      .filter((data) => data.poster_path !== null)
      .map((movie, index) => {
        const movieUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        return (
          <Grid item md={4} xs={12} key={index}>
            <Fade in={transitionStatus} timeout={500}>
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
                        <Typography variant="subtitle2">
                          Not Yet Rated
                        </Typography>
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
            </Fade>
          </Grid>
        );
      });
    return (
      <Grid container spacing={8}>
        {mapMovies}
      </Grid>
    );
  };

  const displayMovieList =
    movieList.length === 0 ? (
      <div
        key={0}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchMovieData}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <CircularProgress />
          </div>
        }
        hasMore={infiniteScrollStatus}
      >
        {mapMovieList(movieList)}
      </InfiniteScroll>
    );

  const title =
    sortByItem === "popular"
      ? "POPULAR"
      : sortByItem === "now_playing"
      ? "NOW PLAYING"
      : sortByItem === "top_rated"
      ? "TOP RATED"
      : "UPCOMING";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Select value={sortByItem} onChange={handleChange}>
          <MenuItem value={"popular"}>Popular</MenuItem>
          <MenuItem value={"now_playing"}>Now Playing</MenuItem>
          <MenuItem value={"top_rated"}>Top Rated</MenuItem>
          <MenuItem value={"upcoming"}>Upcoming</MenuItem>
        </Select>
      </div>

      {displayMovieList}
    </>
  );
}

export default Categories;
