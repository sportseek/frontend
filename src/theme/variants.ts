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
    background: "#2E3543",
  },
  sidebar: {
    width: 230,
    footer: {
      color: grey[200],
      background: "#2E3543",
    },
  },
  body: {
    background: "#F7F9FC",
  },
}

const variants = [lightVariant]

export default variants
