import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff6666",
      main: "#ff3333",
      dark: "#cc0000",
    },
    secondary: {
      light: "#4c5abf",
      main: "#3b4cca",
      dark: "#2a3b8c",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
