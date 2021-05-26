import React from "react"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"
import { StylesProvider } from "@material-ui/styles"
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import Routes from "routes"
import theme from "theme"

const App = () => (
  <>
   <PerfectScrollbar>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
    </PerfectScrollbar>
  </>
)

export default App
