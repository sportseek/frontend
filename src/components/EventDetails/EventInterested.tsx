import React, { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import { updateInterested } from "redux/reducers/event/eventSlice"

import { Button, makeStyles, Theme } from "@material-ui/core"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"

import Tooltip from "components/Common/Tooltip"

import { IEvent } from "types"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { withStyles } from "@material-ui/styles"

type Props = {
  event: IEvent
}

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    border: 0,
    backgroundImage:
      "linear-gradient(to right, #ED4264 0%, #FFEDBC  51%, #ED4264  100%)",
    borderRadius: 15,
    backgroundSize: "200% auto",
    color: "white",
    width: "200px",
    padding: "15px 40px",
    transition: "0.5s",
    // background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    "&:hover": {
      backgroundPosition: "right center",
      // background: "linear-gradient(45deg, #fc4970, #ff8140)",
    },
  },
}))(Button)

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
        <ColorButton
          startIcon={<ThumbDownIcon />}
          variant="contained"
          onClick={handleUpdateInterested}
          disabled={currentEvent.status !== "active"}
        >
          Not Interested
        </ColorButton>
      ) : (
        <Tooltip title="No payment required. Access interested events from your dashboard.">
          <span>
            <ColorButton
              startIcon={<ThumbUpIcon />}
              variant="contained"
              onClick={handleUpdateInterested}
              disabled={currentEvent.status !== "active"}
            >
              Interested
            </ColorButton>
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export default EventInterested
