import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

const lightVariant: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3A4458",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#5B9DD2",
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
    width: 230,
    footer: {
      color: grey[200],
      background: "#62757f",
    },
  },
  body: {
    background: "#efeadd ",
  },
  calendar: {
    interestedEventColor: "#8835",
    registeredEventColor: "#842",
  },
  footer: {
    background: "#4b636e",
    height: 28,
  },
}

const variants = [lightVariant]

export default variants
