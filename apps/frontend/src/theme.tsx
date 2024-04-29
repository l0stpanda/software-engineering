import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "static",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#002866",
    },
    secondary: {
      main: "#009BA8",
    },
    error: {
      main: "#bf435c",
    },
    background: {
      default: "#FBFEFF",
      paper: "#D8D8D8",
    },
    text: {
      primary: "#050315",
    },
    action: {
      active: "#d8d8d8",
    },
  },
});

export default theme;
