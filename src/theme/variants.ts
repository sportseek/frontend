import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

// palette1:
// #FBE8A6, F4976C, 303C6C, B4DFE5, D2FDFF

const lightVariant: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3A4458",
      //main: "#FBE8E6",
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
    //background: "#4b636e",
    background: "#303C6C",
  },
  sidebar: {
    width: 210,
    background: "#D2FDFF",
    footer: {
      color: "#FBE8A6",
      background: "#62757f",
    },
  },
  filterbar: {
    width: 260,
    background: "#D2FDFF",
    footer: {
      color: grey[200],
      background: "#FBE8A6",
    },
  },
  body: {
    //background: "#efeadd ",
    background: "#FBE8A6",
  },
  calendar: {
    interestedEventColor: { main: "#ffc93c", disabled: "#ffefc5" },
    registeredEventColor: { main: "#4aa96c", disabled: "#cde9d8" },
    personalEventColor: { main: "#a7bbc7", disabled: "#d7e0e6" },
  },
  footer: {
    background: "#4b636e",
    height: 28,
  },
}

const variants = [lightVariant]

export default variants
