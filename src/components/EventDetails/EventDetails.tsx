import React, { useState, useEffect } from "react"
import MainFeaturedPost from "components/MainFeaturedPost/MainFeaturedPost"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  updateInterested,
  updateRegistered,
} from "redux/reducers/event/eventSlice"

import { Button, makeStyles, Typography } from "@material-ui/core"
import PaymentIcon from "@material-ui/icons/Payment"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import Grid from "@material-ui/core/Grid"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Tooltip from "@material-ui/core/Tooltip"

import moment from "moment"
import { IEvent } from "types"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"

import Location from "components/Location"

type Props = {
  event: IEvent
}

const useStyles = makeStyles({
  participate: {
    background: "linear-gradient(45deg, #52bfff, #6242ff)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 50px",
  },
  interested: {
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 50px",
  },
  flexroot: {
    flexGrow: 1,
  },
})

const EventInfoCard: React.FC<Props> = ({ event: currentEvent }) => {
  const classes = useStyles()
  const newEntryFee = currentEvent.entryFee / currentEvent.minPlayers
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectLoggedInUser)

  const mainFeaturedPost = {
    title: currentEvent.title,
    //description:  "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: currentEvent.eventImageUrl,
    //imgText: "main image description",
    //linkText: "Continue reading…",
  }

  const [registered, setRegistered] = useState(false)
  const [interested, setInterested] = useState(false)

  useEffect(() => {
    if (currentEvent.interestedPlayers) {
      const isAlreadyInterested = currentEvent.interestedPlayers.find(
        (item) => item === currentUser._id
      )

      if (isAlreadyInterested) setInterested(true)
      else setInterested(false)
    } else setInterested(false)
  }, [currentEvent])
  const handleUpdateInterested = () => {
    setInterested(!interested)
    dispatch(
      updateInterested({
        eventId: currentEvent._id,
        interested: !interested,
      })
    )
  }
  ///////////////////
  useEffect(() => {
    if (currentEvent.registeredPlayers) {
      const isAlreadyRegistered = currentEvent.registeredPlayers.find(
        (item) => item === currentUser._id
      )

      if (isAlreadyRegistered) setRegistered(true)
      else setRegistered(false)
    } else setRegistered(false)
  }, [currentEvent])
  const handleUpdateRegistered = () => {
    setRegistered(!registered)
    dispatch(
      updateRegistered({
        eventId: currentEvent._id,
        registered: !registered,
      })
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MainFeaturedPost post={mainFeaturedPost} />
      </Grid>

      <Grid container xs={6} spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">
                Event Description and Arena Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">
                {currentEvent.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <b>Sport Type:</b> {currentEvent.sportType}
          </Typography>
        </Grid>

        <div style={{ height: "5px" }} />

        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Starts: </b>
            {moment(currentEvent.start).format("LLLL")}
          </Typography>

          <Typography variant="h6">
            <b>Ends: </b>
            {moment(currentEvent.end).format("LLLL")}
          </Typography>
          <div style={{ height: "5px" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Players <b>Registered</b>:{" "}
            {currentEvent.registeredPlayers &&
              currentEvent.registeredPlayers.length}
          </Typography>
          <Typography variant="h6">
            Players <b>Interested</b>:{" "}
            {currentEvent.interestedPlayers &&
              currentEvent.interestedPlayers.length}
          </Typography>
          <div style={{ height: "5px" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">
            <b>Entry Fee</b>: {newEntryFee}
            <div style={{ height: "5px" }} />
          </Typography>
        </Grid>

        <Grid container direction="row" spacing={3}>
          <Grid item>
            {registered ? (
              <Tooltip title="You will receive equivalent Credits.">
                <Button
                  startIcon={<ThumbDownIcon />}
                  className={classes.participate}
                  onClick={handleUpdateRegistered}
                >
                  Deregister
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Pay and confirm participation.">
                <Button
                  startIcon={<PaymentIcon />}
                  className={classes.participate}
                  onClick={handleUpdateRegistered}
                >
                  Participate
                </Button>
              </Tooltip>
            )}
          </Grid>

          <Grid item>
            {interested ? (
              <Button
                startIcon={<ThumbDownIcon />}
                className={classes.interested}
                onClick={handleUpdateInterested}
              >
                Not Interested
              </Button>
            ) : (
              <Tooltip title="No payment required. Access interested events from your dashboard.">
                <Button
                  startIcon={<ThumbUpIcon />}
                  className={classes.interested}
                  onClick={handleUpdateInterested}
                >
                  Interested
                </Button>
              </Tooltip>
            )}
            <div style={{ height: "5px" }} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Credits earned if event is cancelled: {newEntryFee * 0.99}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} spacing={2}>
        <Grid item xs={12}>
          <Location editable={false} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EventInfoCard
