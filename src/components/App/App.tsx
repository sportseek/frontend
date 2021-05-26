import React from "react"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"
import { StylesProvider } from "@material-ui/styles"
import "react-perfect-scrollbar/dist/css/styles.css"
import Routes from "routes"
import theme from "theme"

const App = () => (
  <>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
  </>
)

export default App
