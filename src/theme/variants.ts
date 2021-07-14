import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

// palette1:
// #FBE8A6, F4976C, 303C6C, B4DFE5, D2FDFF

const lightVariant: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#303C6C",
      light: "#7580AB",
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
    height: 70,
    background: "linear-gradient(to bottom, #303C6C 0%, #1E2645 50%, #0D111E 100%)",
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
    background: "#F6F6F6",
  },
  calendar: {
    interestedEventColor: { main: "#ffc93c", disabled: "#ffefc5" },
    registeredEventColor: { main: "#4aa96c", disabled: "#cde9d8" },
    personalEventColor: { main: "#a7bbc7", disabled: "#d7e0e6" },
  },
  footer: {
    background: "#EBECF3",
    height: 28,
  },
}

const variants = [lightVariant]

export default variants
