import React from "react"
import {
  makeStyles,
  createStyles,
  Theme,
  styled,
} from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"
import Helmet from "react-helmet"

import Playerdetails from "components/PlayerDetails"
import Wallet from "components/Wallet"
import Location from "components/Location"
import Calendar from "components/PlayerCalendar"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "../../EventDetails"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      flex: 1,
      height: "30%",
      color: theme.palette.text.secondary,
    },
  })
)

const Root = styled("div")({
  flex: 1,
})

const Column1 = styled(Grid)({})

const Column2 = styled(Grid)({})

const ColContainer = styled(Grid)({})

const Dashboard = () => {
  const classes = useStyles()

  const [tabIndex, setTabIndex] = React.useState(0)

  const goEventDetails = () => setTabIndex(1)
  const goBack = () => setTabIndex(0)

  return (
    <Root>
      <TabPanel value={tabIndex} index={0}>
        <Helmet title="Dashboard" />
        <Grid container spacing={3}>
          <Column1 item xs={12} lg={4}>
            <ColContainer
              container
              spacing={3}
              direction="column"
              justify="space-around"
            >
              <Grid item>
                <Playerdetails />
              </Grid>
              <Grid item>
                <Location />
              </Grid>
              <Grid item>
                <Wallet value="100" />
              </Grid>
            </ColContainer>
          </Column1>
          <Column2 item xs={12} lg>
            <ColContainer
              container
              spacing={3}
              direction="column"
              justify="space-between"
            >
              <Grid item>
                <Calendar goto={goEventDetails} />
              </Grid>

              <Grid item>
                <Grid container spacing={3}>
                  <Grid item lg={6}>
                    <Paper className={classes.paper}>xs=12</Paper>
                  </Grid>
                  <Grid item lg={6}>
                    <Paper className={classes.paper}>xs=12</Paper>
                  </Grid>
                </Grid>
              </Grid>
            </ColContainer>
          </Column2>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <EventDetailsView goBack={goBack} parentPage="DashBoard" />
      </TabPanel>
    </Root>
  )
}

export default Dashboard
