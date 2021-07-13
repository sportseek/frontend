import { grey } from "@material-ui/core/colors"
import { ThemeOptions } from "./types"

// palette1:
// #FBE8A6, F4976C, 303C6C, B4DFE5, D2FDFF, CAFAFE
// C1C8E4, 84CEEB, E7E3D4, FEF9C7, EDEAE5
// 10E7DC, 5CDB95, 3FEEE6, d2ffd4
//linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)
//background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
//background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
//background-image: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
//background-image: radial-gradient( circle 592px at 48.2% 50%,  rgba(255,255,249,0.6) 0%, rgba(160,199,254,1) 74.6% );

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
    background: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
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
