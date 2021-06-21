import React, { useState, useEffect } from "react"

import { Link, useParams } from "react-router-dom"
import MainFeaturedPost from "../../components/MainFeaturedPost/MainFeaturedPost"
import { Button, makeStyles, styled, Typography } from "@material-ui/core"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  fetchEventById,
  selectCurrentEvent,
} from "redux/reducers/event/eventSlice"

import {
  fetchLoggedInUser,
  selectLoggedInUser,
} from "redux/reducers/user/userSlice"

import Grid from "@material-ui/core/Grid"

import EventInfoCard from "components/EventInfo"
import Location from "components/Location"

type Params = {
  id: string
}
function EventInfo() {
  const { id } = useParams<Params>()

  const dispatch = useAppDispatch()
  const currentEvent = useAppSelector(selectCurrentEvent)
  const currentUser = useAppSelector(selectLoggedInUser)

  useEffect(() => {
    console.log(id)
    dispatch(fetchEventById(id))
    dispatch(fetchLoggedInUser())
  }, [])

  const Root = styled("div")({
    flex: 1,
  })

  const Column1 = styled(Grid)({})

  const Column2 = styled(Grid)({})

  const ColContainer = styled(Grid)({})

  return (
    <div>
      {currentEvent && (
        <Grid container spacing={2}>
          <Grid item>
            <EventInfoCard currentEvent={currentEvent} />
          </Grid>

          {/* <Grid item>
            <Location editable={false} />
          </Grid> */}
        </Grid>
      )}
    </div>
  )
}

export default EventInfo
