import React, { useEffect } from "react"
import MainFeaturedPost from "components/MainFeaturedPost/MainFeaturedPost"
import { useAppDispatch, useAppSelector } from "redux/hooks"

import { Button, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

import { IEvent } from "types"

import Location from "components/Location"
import EventAndArenaDesc from "./EventAndArenaDesc"
import EventDates from "./EventDates"
import PlayerNumbers from "./EventPlayerNumbers"
import EventParticipate from "./EventParticipate"
import EventInterested from "./EventInterested"
import ArenaContact from "./ArenaContact"
import EventInvite from "./EventInvite"
import EventsByCreator from "./EventsByCreator"

import {
  fetchArenaById,
  selectCurrentArena,
} from "redux/reducers/arena/arenaSlice"

import {
  fetchAllEventsByCreator,
  selectAllEventsByCreator,
} from "redux/reducers/event/eventSlice"

type Props = {
  event: IEvent
}

const EventInfoCard: React.FC<Props> = ({ event: currentEvent }) => {
  const newEntryFee = currentEvent.entryFee / currentEvent.minPlayers

  const mainFeaturedPost = {
    title: currentEvent.title,
    image: currentEvent.eventImageUrl,
  }

  const euro = "\u20AC"
  const dispatch = useAppDispatch()
  const currentArena = useAppSelector(selectCurrentArena)
  const eventsByCreator = useAppSelector(selectAllEventsByCreator)

  useEffect(() => {
    if (currentEvent.creator)
      dispatch(fetchAllEventsByCreator({ creator: currentEvent.creator }))
  }, [dispatch, currentEvent.creator])

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
              <b>Entry Fee</b>: {newEntryFee} {euro}
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
              Credits earned if event is cancelled: {newEntryFee * 0.99}, Rev:{" "}
              {currentEvent.revenue}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Location editable={false} position={currentEvent.location} />
          </Grid>
          <Grid item xs={12}>
            <ArenaContact arena={currentArena} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Other events hosted by {currentArena.arenaName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <EventsByCreator event={currentEvent} />
      </Grid>
    </Grid>
  )
}

export default EventInfoCard
