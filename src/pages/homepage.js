import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// Components
import SearchBox from "../components/searchBox";
import LatestMovieRelease from "../components/latestMovieRelease";

// MUI
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Homepage({ history }) {
  const [movieOptions, setMovieOptions] = useState([]);

  const fetchMovieOptions = async (title) => {
    if (title.length >= 3) {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=67dd87ea202627ab42b62941829e7dec&language=en-US&query=${title}&page=1&include_adult=false`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      setMovieOptions(data["results"]);
    }
  };

  const handleChangeText = (e) => {
    fetchMovieOptions(e.target.value);
  };

  const handleSelected = (event, value) => {
    history.push(`/movie/${value.id}`);
  };

  const parseMovieLabel = (movieData) => {
    if (
      (movieData.release_date !== null) &
      (movieData.release_date.length !== 0)
    ) {
      return `${movieData.title} (${movieData.release_date.slice(0, 4)})`;
    } else {
      return movieData.title;
    }
  };

  return (
    <Container maxWidth="md">
      {/* <Typography variant="h2" align="center">
        MOVIE REPO 🎬
      </Typography> */}
      {/* <SearchBox /> */}
      {/* <TextField label="Search Movie..." style={{ marginBottom: "25px" }} /> */}
      <Autocomplete
        style={{ width: "250px", marginBottom: "25px" }}
        freeSolo
        options={movieOptions}
        getOptionLabel={(option) => parseMovieLabel(option)}
        disableClearable
        onChange={handleSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Movie..."
            onChange={handleChangeText}
          />
        )}
      />
      <LatestMovieRelease />
    </Container>
  );
}

export default Homepage;
