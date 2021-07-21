import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

// palette1:
// #FBE8A6, F4976C, 303C6C, B4DFE5, D2FDFF, CAFAFE
// C1C8E4, 84CEEB, E7E3D4, FEF9C7, EDEAE5
// 10E7DC, 5CDB95, 3FEEE6, d2ffd4
// linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)
// background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
// background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
// background-image: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
// background-image: radial-gradient( circle 592px at 48.2% 50%,  rgba(255,255,249,0.6) 0%, rgba(160,199,254,1) 74.6% );

const lightVariant: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#303C6C",
      light: "#7580AB",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#00acc1", // "#9c27b0",
      light: "#E4F6F8", // "#D4A2DD",
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
    background: "#303C6C",
    // "linear-gradient(to bottom, #303C6C 0%, #1E2645 50%, #0D111E 100%)",
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
    background: "linear-gradient(to top, #03142b 0%, #1e3f59 100%)",
    footer: {
      color: grey[200],
      background: "#D2FDFF",
    },
  },
  body: {
    // background: "#efeadd ",
    background:
      "linear-gradient(180deg, #edffff 0, #d3ffff 25%, #b5f2f2 50%, #96dfe3 75%, #7bd0d7 100%)",
    // background: "#efeadd ",
    // background: "#F6F6F6",
    //background: "#d9fffd",
    // background: "#EEE",
  },
  calendar: {
    interestedEventColor: { main: "#ff9800", disabled: "#ffd79d" },
    registeredEventColor: { main: "#4caf50", disabled: "#cde9d8" },
    personalEventColor: { main: "#7580AB", disabled: "#d7e0e6" },
  },
  footer: {
    background: "#EBECF3",
    height: 28,
  },
}

const variants = [lightVariant]

export default variants
