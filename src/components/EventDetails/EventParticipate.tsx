import React, { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  updateRegistered,
  selectEventConflict,
  regConflict,
} from "redux/reducers/event/eventSlice"

import { withStyles } from "@material-ui/styles"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import PaymentIcon from "@material-ui/icons/Payment"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"

import Tooltip from "components/Common/Tooltip"

import { IEvent } from "types"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

import EventInvite from "./EventInvite"
import StripeCheckout from "./Payment"

type Props = {
  event: IEvent
}

const ColorButton = withStyles(() => ({
  root: {
    border: 0,
    borderRadius: 15,
    color: "white",
    width: "200px",
    padding: "15px 40px",
    backgroundImage:
      "linear-gradient(to right, #085078 0%, #85D8CE  51%, #085078  100%)",
    transition: "0.5s",
    backgroundSize: "200% auto",
    // background: "linear-gradient(45deg, #52bfff, #6242ff)",
    "&:hover": {
      backgroundPosition: "right center",
      // background: "linear-gradient(45deg, #29b0ff, #4b26ff)",
    },
  },
}))(Button)

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const EventParticipate: React.FC<Props> = ({ event: currentEvent }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentEvent._id) {
      dispatch(regConflict(currentEvent._id))
    }
  }, [currentEvent._id, dispatch])

  const conflict = useAppSelector(selectEventConflict)

  const currentUser = useAppSelector(selectLoggedInUser)

  const [registered, setRegistered] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [snackbarOpen, setsnackbarOpen] = React.useState(false)

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setsnackbarOpen(false)
  }

  useEffect(() => {
    if (currentEvent.registeredPlayers) {
      const isAlreadyRegistered = currentEvent.registeredPlayers.find(
        (item) => item === currentUser._id
      )
      if (isAlreadyRegistered) setRegistered(true)
      else setRegistered(false)
    } else setRegistered(false)
  }, [currentEvent.registeredPlayers, currentUser._id])

  const handleUpdateRegistered = (withWallet: boolean) => {
    setRegistered(!registered)
    dispatch(
      updateRegistered({
        eventId: currentEvent._id,
        registered: !registered,
        fee: currentEvent.entryFee,
        withWallet,
      })
    )
  }

  const handleOpenPayment = () => {
    setsnackbarOpen(true)
    setOpenPayment(true)
  }

  const handleClosePayment = () => {
    setOpenPayment(false)
  }

  return (
    <div>
      {registered ? (
        <Grid container spacing={3}>
          <Grid item>
            <Tooltip title="You will receive equivalent Credits.">
              <span>
                <ColorButton
                  startIcon={<ThumbDownIcon />}
                  variant="contained"
                  onClick={() => handleUpdateRegistered(false)}
                  disabled={currentEvent.status !== "active"}
                >
                  {registered ? "Deregister" : "Participate"}
                </ColorButton>
              </span>
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
              <span>
                <ColorButton
                  startIcon={<PaymentIcon />}
                  variant="contained"
                  onClick={handleOpenPayment}
                  disabled={
                    currentEvent.status !== "active" ||
                    currentEvent.registeredPlayers.length ===
                      currentEvent.maxPlayers
                  }
                >
                  Participate
                </ColorButton>
              </span>
            </Tooltip>
            {conflict ? (
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
              >
                <Alert onClose={handleSnackbarClose} severity="warning">
                  WARNING: Event overlaps with another registered event!
                </Alert>
              </Snackbar>
            ) : (
              ""
            )}
          </Grid>
          <Grid item>
            <EventInvite registered={registered} />
          </Grid>
        </Grid>
      )}
      <StripeCheckout
        open={openPayment}
        submitPayment={handleUpdateRegistered}
        closePaymentDialog={handleClosePayment}
      />
    </div>
  )
}

export default EventParticipate
