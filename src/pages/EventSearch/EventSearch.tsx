import React, { useEffect } from "react"
import {
  makeStyles,
  createStyles,
  Theme,
  styled,
} from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"
import Helmet from "react-helmet"

import EventCard from "components/EventCard"
import FilterEvents from "components/FilterEvents"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { getAllEvents, selectAllEvents } from "redux/reducers/event/eventSlice"

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

  useEffect(() => {
    dispatch(getAllEvents({}))
  }, [])

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12}>
            <Grid container spacing={2} justify="center">
              {allEvents.map((item) => (
                <Grid item xs={4} key={item._id}>
                  <EventCard event={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
      <FilterEvents />
    </div>
  )
}

export default EventSearch
