import React, { useState } from "react";

// Components
import Categories from "../components/categories";

// MUI
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Homepage({ history }) {
  const [movieOptions, setMovieOptions] = useState([]);

  const fetchMovieOptions = async (title) => {
    if (title.length >= 2) {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      setMovieOptions(data["results"]);
    } else {
      setMovieOptions([]);
    }
  };

  const handleChangeText = (e) => {
    fetchMovieOptions(e.target.value);
  };

  const handleSelected = (event, value, reason) => {
    if (reason === "select-option") {
      history.push(`/movie/${value.id}`);
    }
  };

  const parseMovieLabel = (movieData) => {
    if (movieData.release_date !== undefined) {
      if (
        (movieData.release_date !== null) &
        (movieData.release_date.length !== 0)
      ) {
        return `${movieData.title} (${movieData.release_date.slice(0, 4)})`;
      } else {
        return movieData.title;
      }
    } else {
      return movieData.title;
    }
  };

  return (
    <Container maxWidth="md">
      <Autocomplete
        style={{ width: "250px", marginBottom: "25px" }}
        freeSolo
        options={movieOptions}
        getOptionLabel={(option) => parseMovieLabel(option)}
        disableClearable
        onChange={handleSelected}
        renderInput={(params) => (
          <TextField
            style={{ fontSize: "16px" }}
            {...params}
            label="Search Movies..."
            onChange={handleChangeText}
          />
        )}
      />
      <Categories />
    </Container>
  );
}

export default Homepage;
