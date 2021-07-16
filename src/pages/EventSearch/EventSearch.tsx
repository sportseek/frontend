/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { Grid, Grow, Theme } from "@material-ui/core"
import Helmet from "react-helmet"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "pages/EventDetails"
import EventCard from "components/EventCard"
import FilterEvents from "components/FilterEvents"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  getMinMaxPrice,
  getMinMaxDate,
  selectAllEvents,
  selectCurrentEventId,
  setCurEventId,
} from "redux/reducers/event/eventSlice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      display: "flex",
      padding: theme.spacing(1),
      marginRight: theme.filterbar.width,
    },
    root: {
      flex: 1,
      display: "flex",
    },
  })
)

const EventSearch = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const allEvents = useAppSelector(selectAllEvents)

  const eventId = useAppSelector(selectCurrentEventId)
  const [tabIndex, setTabIndex] = useState(0)

  const gotoEventDetails = useCallback(
    (id: string) => {
      setTabIndex(1)
      dispatch(setCurEventId(id))
    },
    [dispatch]
  )

  const goBack = useCallback(() => {
    setTabIndex(0)
    dispatch(setCurEventId(""))
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getAllEvents({
        sortBy: "start",
        sortValue: -1,
      })
    )
    dispatch(getMinMaxPrice())
    dispatch(getMinMaxDate())
  }, [dispatch, tabIndex])

  useEffect(() => {
    if (eventId) gotoEventDetails(eventId)
    else goBack()
  }, [eventId, goBack, gotoEventDetails])

  return (
    <div className={classes.root}>
      <TabPanel value={tabIndex} index={0}>
        <Helmet title="Search events" />
        <main className={classes.content}>
          <Grid
            container
            spacing={4}
            justify="space-around"
            alignItems="center"
          >
            {allEvents.map((item, index) => (
              <Grow
                in
                key={`${item._id} ${index}`}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000 + index * 150}
              >
                <Grid item xs={12} md={6} lg={4}>
                  <EventCard event={item} openDetails={gotoEventDetails} />
                </Grid>
              </Grow>
            ))}
          </Grid>
        </main>
        <FilterEvents />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <EventDetailsView
          goBack={goBack}
          parentPage="Search events"
          id={eventId}
        />
      </TabPanel>
    </div>
  )
}

export default EventSearch
