import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Nav from "./components/nav";
import Footer from "./components/footer";

// Pages
import Homepage from "./pages/homepage";
import MoviePage from "./pages/moviepage";
import CatchAll from "./pages/catchall";

// Mui
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { darkMode } from "./util/themeFile";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  const darkTheme = createMuiTheme(darkMode);

  const currentBackground =
    localStorage.getItem("backgroundImg") || "/xFxk4vnirOtUxpOEWgA1MCRfy6J.jpg";

  const [defaultBg, setDefaultBg] = useState(currentBackground);

  useEffect(() => {
    localStorage.setItem("backgroundImg", defaultBg);
  }, [defaultBg]);

  const handleBackgroundChange = (bgUrl) => {
    setDefaultBg(bgUrl);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${defaultBg})`,
        backgroundSize: "cover",
        maxHeight: "200vh",
        transition: "background .25s ease-in",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 1) 90%",
          height: "100vh",
          // backdropFilter: "blur(15px)",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Container maxWidth="lg">
              <div
                style={{
                  position: "relative",
                  minHeight: "100vh",
                  paddingBottom: "130px",
                }}
              >
                <Nav />
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <Homepage {...props} />}
                  />
                  <Route
                    exact
                    path="/movie/:movieid"
                    component={(props) => (
                      <MoviePage
                        {...props}
                        handleBackgroundChange={(bgUrl) =>
                          handleBackgroundChange(bgUrl)
                        }
                      />
                    )}
                  />
                  <Route component={CatchAll} />
                </Switch>
                <Footer />
              </div>
            </Container>
          </Router>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
