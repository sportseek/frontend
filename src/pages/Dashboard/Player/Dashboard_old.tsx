import React from "react"
import { styled } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Helmet from "react-helmet"

import Playerdetails from "components/PlayerDetails"
import Wallet from "components/Wallet"
import Location from "components/Location"
import Calendar from "components/PlayerCalendar"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "pages/EventDetails"

const Root = styled("div")({
  flex: 1,
})

const Column1 = styled(Grid)({})

const Column2 = styled(Grid)({})

const ColContainer = styled(Grid)({})

const Dashboard = () => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const [eventId, setEventId] = React.useState("")

  const goEventDetails = (id: string) => {
    setEventId(id)
    setTabIndex(1)
  }
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
                <Wallet />
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
                <Calendar />
              </Grid>
            </ColContainer>
          </Column2>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <EventDetailsView goBack={goBack} parentPage="DashBoard" id={eventId} />
      </TabPanel>
    </Root>
  )
}

export default Dashboard
