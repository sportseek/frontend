import React, { useCallback, useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { updateRegistered } from "redux/reducers/event/eventSlice"

import { Button, makeStyles, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

import Tooltip from "components/Common/Tooltip"
import EventCard from "components/EventCard"

import { IEvent } from "types"

import {
  fetchAllEventsByCreator,
  selectAllEventsByCreator,
  setCurEventId,
} from "redux/reducers/event/eventSlice"

type Props = {
  event: IEvent
}

const EventsByCreator: React.FC<Props> = ({ event: currentEvent }) => {
  const dispatch = useAppDispatch()
  const eventsByCreator = useAppSelector(selectAllEventsByCreator)

  useEffect(() => {
    if (currentEvent.creator)
      dispatch(fetchAllEventsByCreator({ creator: currentEvent.creator }))
  }, [dispatch, currentEvent.creator])

  const gotoEventDetails = useCallback(
    (id: string) => {
      //setTabIndex(1)
      dispatch(setCurEventId(id))
    },
    [dispatch]
  )

  return (
    <Grid container spacing={4} justify="space-around" alignItems="center">
      {eventsByCreator.map((item) =>
        item._id != currentEvent._id ? (
          <Grid item xs={12} md={6} lg={3} key={item._id}>
            <EventCard event={item} openDetails={gotoEventDetails} />
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid>
  )
}

export default EventsByCreator
