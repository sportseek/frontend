import React from "react"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"
import { StylesProvider } from "@material-ui/styles"
import "react-big-calendar/lib/css/react-big-calendar.css"
import Routes from "routes"
import theme from "theme"
import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

const App = () => (
  <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes />
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </MuiPickersUtilsProvider>
  </>
)

export default App
