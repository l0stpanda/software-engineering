import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "sticky",
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
      active: "#888888",
    },
  },
});

export default theme;
