import React from "react"
import MainFeaturedPost from "components/MainFeaturedPost/MainFeaturedPost"

import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

import { IEvent } from "types"

import Location from "components/Location"
import EventAndArenaDesc from "./EventAndArenaDesc"
import EventDates from "./EventDates"
import PlayerNumbers from "./EventPlayerNumbers"
import EventParticipate from "./EventParticipate"
import EventInterested from "./EventInterested"

type Props = {
  event: IEvent
}

const EventInfoCard: React.FC<Props> = ({ event: currentEvent }) => {
  const newEntryFee = currentEvent.entryFee / currentEvent.minPlayers

  const mainFeaturedPost = {
    title: currentEvent.title,
    image: currentEvent.eventImageUrl,
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainFeaturedPost post={mainFeaturedPost} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EventAndArenaDesc event={currentEvent} />
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
              <b>Entry Fee</b>: {newEntryFee}
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
              Credits earned if event is cancelled: {newEntryFee * 0.99}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Location editable={false} position={currentEvent.location} />
      </Grid>
    </Grid>
  )
}

export default EventInfoCard
