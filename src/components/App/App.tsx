import React from "react"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"
import { StylesProvider } from "@material-ui/styles"

import Routes from "routes"
import themes from "theme"

const App = () => (
  <>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={themes[0]}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
  </>
)

export default App
