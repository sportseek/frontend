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
  header: {
    height: 60,
    background: "#4b636e",
  },
  sidebar: {
    width: 230,
    footer: {
      height: 20,
      color: grey[200],
      background: "#62757f",
    },
  },
  body: {
    background: "#F7F9FC",
  },
}

const variants = [lightVariant]

export default variants
