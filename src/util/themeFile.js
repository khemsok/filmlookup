const themeConfig = {
  typography: {
    fontFamily:
      "Roboto, sans-serif, Roboto Mono, monospace, Roboto Condensed, sans-serif",
    h1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    h2: {
      fontFamily: "Roboto Mono, monospace",
      fontWeight: "700",
    },
    h3: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "700",
    },
    h4: {
      fontFamily: "Roboto Mono, monospace",
      fontWeight: "700",
    },
    subtitle1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    subtitle2: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeight: "700",
    },
    body1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1em",
    },
  },
};

export const darkMode = {
  ...themeConfig,
  palette: {
    type: "dark",
    primary: {
      main: "#7FFFD4",
    },
    background: {
      default: "#000000",
      paper: "#000",
    },
  },
};

// blue #0023EF
// beige

export const lightMode = {
  ...themeConfig,
  palette: {
    type: "light",
    primary: {
      main: "#FF3D3D",
    },
    secondary: {
      main: "#0023EF",
    },
  },
};
