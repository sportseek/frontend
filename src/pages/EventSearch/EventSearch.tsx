import React from "react"
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
      display: 'flex',
    },
  })
)

const EventSearch = () => {
  const classes = useStyles()

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
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
              <Grid item xs={4}>
                <EventCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
      <FilterEvents />
    </div>
  )
}

export default EventSearch
