import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeOptions } from "./types"
import variants from "./variants"

const createTheme = (variant: ThemeOptions) =>
  createMuiTheme({
    palette: variant.palette,
    typography: variant.typography,
    sidebar: variant.sidebar,
    body: variant.body,
    header: variant.header,
    footer: variant.footer,
  })

const themes = variants.map((variant) => createTheme(variant))

export default themes[0]
