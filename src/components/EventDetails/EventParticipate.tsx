import React, { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { updateRegistered } from "redux/reducers/event/eventSlice"

import { Button, makeStyles, Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import PaymentIcon from "@material-ui/icons/Payment"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"

import Tooltip from "components/Common/Tooltip"

import { IEvent } from "types"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"

import EventInvite from "./EventInvite"

type Props = {
  event: IEvent
}

const useStyles = makeStyles({
  participate: {
    background: "linear-gradient(45deg, #52bfff, #6242ff)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 40px",
  },
})

const EventParticipate: React.FC<Props> = ({ event: currentEvent }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectLoggedInUser)

  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    if (currentEvent.registeredPlayers) {
      const isAlreadyRegistered = currentEvent.registeredPlayers.find(
        (item) => item === currentUser._id
      )
      if (isAlreadyRegistered) setRegistered(true)
      else setRegistered(false)
    } else setRegistered(false)
  }, [currentEvent, currentUser._id])

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
    <div>
      {registered ? (
        <Grid container spacing={3}>
          <Grid item>
            <Tooltip title="You will receive equivalent Credits.">
              <Button
                startIcon={<ThumbDownIcon />}
                className={classes.participate}
                onClick={handleUpdateRegistered}
              >
                Deregister
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <EventInvite registered={registered} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item>
            <Tooltip title="Pay and confirm participation.">
              <Button
                startIcon={<PaymentIcon />}
                className={classes.participate}
                onClick={handleUpdateRegistered}
              >
                Participate
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <EventInvite registered={registered} />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default EventParticipate
