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

// MUI Icon
import StarIcon from "@material-ui/icons/Star";

function LatestMovieRelease() {
  const [movieList, setMovieList] = useState([]);
  const [pageMax, setPageMax] = useState(-1);
  const [infiniteScrollStatus, setInfiniteScrollStatus] = useState(true);

  const fetchMovieData = async (page) => {
    const pageToUse = page === undefined ? 1 : page;
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageToUse}&region=US`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    if (pageMax !== -1) {
      setPageMax(data.total_pages);
    }

    if (pageToUse <= data.total_pages) {
      setMovieList([...movieList, ...data.results]);
    }

    if (pageToUse === data.total_pages) {
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
          <Fade in={true} timeout={500}>
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
            </Grid>
          </Fade>
        );
      });
    return mapMovies;
  };

  const displayMovieList =
    movieList.length === 0 ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    ) : (
      <>
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
