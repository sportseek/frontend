import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeOptions } from "./types"
import variants from "./variants"

const createTheme = (variant: ThemeOptions) =>
  createMuiTheme({
    palette: variant.palette,
    typography: variant.typography,
    sidebar: variant.sidebar,
    filterbar: variant.filterbar,
    body: variant.body,
    calendar: variant.calendar,
    header: variant.header,
    footer: variant.footer,
  })

const themes = variants.map((variant) => createTheme(variant))

export default themes[0]
