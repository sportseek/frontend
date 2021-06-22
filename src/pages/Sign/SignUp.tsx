import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import PlayerSignup from "components/PlayerSignup"
import { isIfAuthenticated } from "redux/reducers/auth/authSlice"
import ArenaSignup from "components/ArenaSignup"
import Helmet from "react-helmet"
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tabWrapper: {
    border: "1px solid black",
    marginTop: "32px",
  },
}))

const SignUpPage: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const isAuthenticated = useAppSelector(isIfAuthenticated)
  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div className={classes.root}>
      <Helmet title="SportSeek - Sign up" />
      <div className={classes.tabWrapper}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Player" {...a11yProps(0)} />
            <Tab label="Arena owner" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PlayerSignup />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ArenaSignup />
        </TabPanel>
      </div>
    </div>
  )
}

export default SignUpPage
