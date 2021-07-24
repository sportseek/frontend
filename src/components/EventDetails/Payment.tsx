import React, { useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import { loadStripe } from "@stripe/stripe-js"
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js"
import Button from "@material-ui/core/Button"
import "./payment.css"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  createPaymentIntent,
  selectCurrentEvent,
  selectStripeClientSecretKey,
} from "redux/reducers/event/eventSlice"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import IPlayer from "types/Player"

import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles({
  paymentContainer: {
    padding: "16px",
  },
  paymentButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  outlinedBtn: {
    border: "1px solid",
  },
})

type Props = {
  open: boolean
  closePaymentDialog: Function
  submitPayment: Function
}

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string)

const Payment: React.FC<Props> = ({
  open,
  closePaymentDialog,
  submitPayment,
}) => {
  const classes = useStyles()

  const [payWithWallet, setPayWithWallet] = useState(false)
  const dispatch = useAppDispatch()

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const stripe = useStripe()
  const elements = useElements()

  const currentEvent = useAppSelector(selectCurrentEvent)
  const player = useAppSelector(selectLoggedInUser) as IPlayer
  const secretKey = useAppSelector(selectStripeClientSecretKey)

  const setInitialState = () => {
    setSucceeded(false)
  }

  const handleClose = () => {
    setInitialState()
    closePaymentDialog()
  }

  const handleSubmitPayment = async (ev: any) => {
    ev.preventDefault()
    setProcessing(true)
    if (stripe && elements && !payWithWallet) {
      const payload = await stripe.confirmCardPayment(secretKey, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`)
        setProcessing(false)
      } else {
        setError("")
        setProcessing(false)
        setSucceeded(true)
        submitPayment(payWithWallet)
        setPayWithWallet(false)
      }
    } else if (payWithWallet) {
      submitPayment(payWithWallet)
      setSucceeded(true)
      setPayWithWallet(false)
    }
  }

  const handleCreatePaymentIntent = useCallback(async () => {
    dispatch(
      createPaymentIntent({
        amount: currentEvent.entryFee * 100,
      })
    )
  }, [currentEvent.entryFee, dispatch])

  useEffect(() => {
    if (currentEvent.entryFee && !payWithWallet) handleCreatePaymentIntent()
  }, [currentEvent.entryFee, handleCreatePaymentIntent, payWithWallet])

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handlePaymentMethod = (method: string) => {
    if (method === "withWallet") setPayWithWallet(true)
    else setPayWithWallet(false)
  }

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

  return (
    <Dialog
      // fullWidth
      // maxWidth="md"
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Register for the event</DialogTitle>

      <div className={classes.paymentContainer}>
        {succeeded ? (
          <article>
            <h3>Thank you!</h3>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Your payment was successful!
              </Alert>
            </Snackbar>
          </article>
        ) : (
          <article>
            <p>Your registration fee is {currentEvent.entryFee} </p>
            <p>
              Your wallet:{" "}
              {player.wallet ? player.wallet.toFixed(2) : player.wallet}{" "}
            </p>

            <div className={classes.paymentButtonContainer}>
              <Button
                className={classes.outlinedBtn}
                style={{ marginRight: "32px" }}
                color="primary"
                onClick={() => handlePaymentMethod("withoutWallet")}
              >
                Select pay without wallet
              </Button>
              <Button
                className={classes.outlinedBtn}
                disabled={currentEvent.entryFee > player.wallet}
                color="secondary"
                onClick={() => handlePaymentMethod("withWallet")}
              >
                Select pay with wallet
              </Button>
            </div>

            {!payWithWallet && <p>*You are not paying with your wallet</p>}
            {payWithWallet && <p>*You are paying with your wallet</p>}
            <p>Test card number: 4242 4242 4242 4242</p>
          </article>
        )}
        {!payWithWallet && !succeeded && (
          <form
            id="payment-form"
            onSubmit={handleSubmitPayment}
            className="custom-form"
          >
            <CardElement id="card-element" onChange={handleChange} />
            <Button color="primary" type="submit" className="paymentButton">
              Pay
            </Button>
            {/*  show error*/}
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
          </form>
        )}
        {payWithWallet && (
          <div className={classes.closeBtn}>
            <Button
              className={classes.outlinedBtn}
              color="primary"
              onClick={handleSubmitPayment}
            >
              Pay with wallet
            </Button>
          </div>
        )}
        {succeeded && (
          <div className={classes.closeBtn}>
            <Button
              className={classes.outlinedBtn}
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  )
}

const StripeCheckout: React.FC<Props> = ({
  open,
  closePaymentDialog,
  submitPayment,
}) => {
  const classes = useStyles()

  return (
    <Elements stripe={promise}>
      <Payment
        open={open}
        submitPayment={submitPayment}
        closePaymentDialog={closePaymentDialog}
      />
    </Elements>
  )
}

export default StripeCheckout
