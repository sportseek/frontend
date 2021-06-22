import React, { useCallback, useEffect, useState } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Helmet from "react-helmet"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "pages/EventDetails"
import EventCard from "components/EventCard"
import FilterEvents from "components/FilterEvents"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  getMinMaxPrice,
  selectAllEvents,
  selectCurrentEventId,
  setCurEventId,
} from "redux/reducers/event/eventSlice"

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      flex: 1,
      height: "30%",
      color: theme.palette.text.secondary,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    root: {
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
    dispatch(getAllEvents({}))
    dispatch(getMinMaxPrice())
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
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid container spacing={2} justify="space-evenly">
              {allEvents.map((item) => (
                <Grid item xs={4} key={item._id}>
                  <EventCard event={item} openDetails={gotoEventDetails} />
                </Grid>
              ))}
            </Grid>
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
