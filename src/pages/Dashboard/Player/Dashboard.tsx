import React from "react"
import { styled } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Helmet from "react-helmet"

import Playerdetails from "components/PlayerDetails"
import Wallet from "components/Wallet"
import Friends from "components/PlayerFriends"
import Location from "components/Location"
import Calendar from "components/PlayerCalendar"

const Root = styled("div")({
  flex: 1,
})

const Dashboard = () => (
  <Root>
    <Helmet title="Dashboard" />
    <Grid container spacing={3}>
      <Grid item lg={12}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item lg={4}>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={12} lg={12}>
                <Playerdetails />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Location />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg>
            <Calendar />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} lg={4}>
            <Wallet />
          </Grid>
          <Grid item xs={12} lg>
            <Friends />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Root>
)

export default Dashboard
