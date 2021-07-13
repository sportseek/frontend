import React, { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { updateInterested } from "redux/reducers/event/eventSlice"

import { Button, makeStyles, Typography } from "@material-ui/core"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"

import Tooltip from "components/Common/Tooltip"

import { IEvent } from "types"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"

type Props = {
  event: IEvent
}

const useStyles = makeStyles({
  interested: {
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 40px",
  },
})

const EventInterested: React.FC<Props> = ({ event: currentEvent }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectLoggedInUser)
  const [interested, setInterested] = useState(false)

  useEffect(() => {
    if (currentEvent.interestedPlayers) {
      const isAlreadyInterested = currentEvent.interestedPlayers.find(
        (item) => item === currentUser._id
      )

      if (isAlreadyInterested) setInterested(true)
      else setInterested(false)
    } else setInterested(false)
  }, [currentEvent, currentUser._id])

  const handleUpdateInterested = () => {
    setInterested(!interested)
    dispatch(
      updateInterested({
        eventId: currentEvent._id,
        interested: !interested,
      })
    )
  }
  return (
    <div>
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
    </div>
  )
}

export default EventInterested
