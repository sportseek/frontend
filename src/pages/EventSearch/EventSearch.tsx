import React, { useEffect } from "react"
import {
  makeStyles,
  createStyles,
  Theme,
  styled,
} from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"
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
import {
  setSearchPageTabIndex,
  selectSearchPageTabIndex,
} from "redux/reducers/ui/uiSlice"

const useStyles = makeStyles((theme: Theme) =>
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
  const tabIndex = useAppSelector(selectSearchPageTabIndex)

  const gotoEventDetails = (id: string) => {
    dispatch(setSearchPageTabIndex(1))
    dispatch(setCurEventId(id))
  }
  const goBack = () => {
    dispatch(setSearchPageTabIndex(0))
    dispatch(setCurEventId(""))
  }

  useEffect(() => {
    dispatch(getAllEvents({}))
    dispatch(getMinMaxPrice())
  }, [dispatch])

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
