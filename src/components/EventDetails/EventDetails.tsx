import React, { useEffect } from "react"
import MainFeaturedPost from "components/MainFeaturedPost/MainFeaturedPost"
import { useAppDispatch, useAppSelector } from "redux/hooks"

import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

import {
  fetchArenaById,
  selectCurrentArena,
} from "redux/reducers/arena/arenaSlice"

import { selectCurrentEvent } from "redux/reducers/event/eventSlice"

import Location from "components/EventLocation"
import EventAndArenaDesc from "./EventAndArenaDesc"
import EventDates from "./EventDates"
import PlayerNumbers from "./EventPlayerNumbers"
import EventParticipate from "./EventParticipate"
import EventInterested from "./EventInterested"
import ArenaContact from "./ArenaContact"
import EventsByCreator from "./EventsByCreator"

const EventDetails: React.FC = () => {
  const currentEvent = useAppSelector(selectCurrentEvent)

  const mainFeaturedPost = {
    title: currentEvent.title,
    image: currentEvent.eventImageUrl,
  }

  const euro = "\u20AC"
  const dispatch = useAppDispatch()
  const currentArena = useAppSelector(selectCurrentArena)

  useEffect(() => {
    if (currentEvent.creator) dispatch(fetchArenaById(currentEvent.creator))
  }, [dispatch, currentEvent.creator])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainFeaturedPost post={mainFeaturedPost} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EventAndArenaDesc event={currentEvent} arena={currentArena} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <b>Sport Type:</b> {currentEvent.sportType}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <EventDates event={currentEvent} />
          </Grid>
          <Grid item xs={12}>
            <PlayerNumbers event={currentEvent} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              <b>Entry Fee</b>: {currentEvent.entryFee} {euro}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item>
                <EventParticipate event={currentEvent} />
              </Grid>
              <Grid item>
                <EventInterested event={currentEvent} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Amount received if event is cancelled: {currentEvent.entryFee}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Amount received if you Deregister from the event:{" "}
              {Math.floor(currentEvent.entryFee * 0.99)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Location arena={currentArena} />
          </Grid>
          <Grid item xs={12}>
            <ArenaContact arena={currentArena} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Some other events hosted by {currentArena.arenaName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <EventsByCreator event={currentEvent} />
      </Grid>
    </Grid>
  )
}

export default EventDetails
