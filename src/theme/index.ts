import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeOptions } from "./types"
import variants from "./variants"

const createTheme = (variant: ThemeOptions) =>
  createMuiTheme({
    palette: variant.palette,
    sidebar: variant.sidebar,
    body: variant.body,
    header: variant.header,
  })

const themes = variants.map((variant) => createTheme(variant))

export default themes[0]