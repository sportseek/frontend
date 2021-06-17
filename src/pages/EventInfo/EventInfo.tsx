import React, { useState, useEffect } from "react"

import { Link, useParams } from "react-router-dom"
import MainFeaturedPost from "../../components/MainFeaturedPost/MainFeaturedPost"
import { Button, makeStyles, Typography } from "@material-ui/core"

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
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import moment from "moment"
import PeopleIcon from "@material-ui/icons/People"

import EventInfoCard from "components/EventInfo"

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

  return (
    <div>{currentEvent && <EventInfoCard currentEvent={currentEvent} />}</div>
  )
}

export default EventInfo
