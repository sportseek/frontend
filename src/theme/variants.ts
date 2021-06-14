import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

const lightVariant: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3A4458",
      light: "#9fb0d1",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#5B9DD2",
      light: "#abe4eb",
      contrastText: "#FFF",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  header: {
    height: 60,
    background: "#4b636e",
  },
  sidebar: {
    width: 210,
    footer: {
      color: grey[200],
      background: "#62757f",
    },
  },
  body: {
    background: "#efeadd ",
  },
  calendar: {
    interestedEventColor: "#ffc93c",
    registeredEventColor: "#4aa96c",
    busyEventColor: "#a7bbc7",
  },
  footer: {
    background: "#4b636e",
    height: 28,
  },
}

const variants = [lightVariant]

export default variants
