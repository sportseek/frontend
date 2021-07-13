import React, { useCallback, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Helmet from "react-helmet"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import Playerdetails from "components/PlayerDetails"
import Wallet from "components/Wallet"
import Friends from "components/PlayerFriends"
import Location from "components/Location"
import Calendar from "components/PlayerCalendar"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "pages/EventDetails"
import {
  selectCurrentEventId,
  setCurEventId,
} from "redux/reducers/event/eventSlice"

const Root = styled("div")({
  flex: 1,
})

const Dashboard = () => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const eventId = useAppSelector(selectCurrentEventId)

  const dispatch = useAppDispatch()

  const goEventDetails = useCallback(
    (id: string) => {
      dispatch(setCurEventId(id))
      setTabIndex(1)
    },
    [dispatch]
  )

  const goBack = useCallback(() => {
    setTabIndex(0)
    dispatch(setCurEventId(""))
  }, [dispatch])

  useEffect(() => {
    if (eventId) goEventDetails(eventId)
    else goBack()
  }, [eventId, goBack, goEventDetails])

  return (
    <Root>
      <TabPanel value={tabIndex} index={0}>
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
                <Calendar goto={goEventDetails} />
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
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <EventDetailsView goBack={goBack} parentPage="DashBoard" id={eventId} />
      </TabPanel>
    </Root>
  )
}

export default Dashboard
