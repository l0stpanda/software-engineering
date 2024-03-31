import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#002866",
    },
    secondary: {
      main: "#D8D8D8",
    },
    error: {
      main: "#bf435c",
    },
    background: {
      default: "#FBFEFF",
      paper: "#009BA8",
    },
    text: {
      primary: "#050315",
    },
  },
});

export default theme;
