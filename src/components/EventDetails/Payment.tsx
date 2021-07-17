import React, { useEffect, useState } from "react"
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
})

type Props = {
  open: boolean
  closePaymentDialog: Function
  submitSPayment: Function
}

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string)

const Payment: React.FC<Props> = ({
  open,
  closePaymentDialog,
  submitSPayment,
}) => {
  const classes = useStyles()

  const [payWithWallet, setPayWithWallet] = useState(false)
  const dispatch = useAppDispatch()

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()

  const currentEvent = useAppSelector(selectCurrentEvent)
  const player = useAppSelector(selectLoggedInUser) as IPlayer
  const secretKey = useAppSelector(selectStripeClientSecretKey)

  const handleClose = () => {
    closePaymentDialog()
  }

  const handleSubmitPayment = async (ev: any) => {
    // submitSPayment()
    ev.preventDefault()
    setProcessing(true)
    if (stripe && elements) {
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
      }
    }
  }

  const handleCreatePaymentIntent = async () => {
    dispatch(
      createPaymentIntent({
        amount: currentEvent.entryFee * 100,
      })
    )
  }

  useEffect(() => {
    if (currentEvent.entryFee) handleCreatePaymentIntent()
  }, [currentEvent.entryFee])

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const handlePaymentMethod = (method: string) => {
    if (method === "withWallet") setPayWithWallet(true)
    else setPayWithWallet(false)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Register for the event</DialogTitle>

      <div className={classes.paymentContainer}>
        {succeeded ? (
          <article>
            <h4>Thank you</h4>
            <h4>Your payment was successful</h4>
            <h4>Redirection to home page shortly</h4>
          </article>
        ) : (
          <article>
            <p>Your registration fee is {currentEvent.entryFee} </p>
            <p>Your wallet: {player.wallet} </p>

            <div className={classes.paymentButtonContainer}>
              <Button
                color="primary"
                onClick={() => handlePaymentMethod("withoutWallet")}
              >
                Pay without wallet
              </Button>
              <Button
                disabled={currentEvent.entryFee > player.wallet}
                color="secondary"
                onClick={() => handlePaymentMethod("withWallet")}
              >
                Pay with wallet
              </Button>
            </div>

            {!payWithWallet && <p>*You are not paying with your wallet</p>}
            {payWithWallet && <p>*You are paying with your wallet</p>}
            <p>Test card number: 4242 4242 4242 4242</p>
          </article>
        )}
        <form id="payment-form" onSubmit={handleSubmitPayment}>
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
      </div>
    </Dialog>
  )
}

const StripeCheckout: React.FC<Props> = ({
  open,
  closePaymentDialog,
  submitSPayment,
}) => {
  const classes = useStyles()

  return (
    <div style={{ width: "40vw" }}>
      <Elements stripe={promise}>
        <Payment
          open={open}
          submitSPayment={submitSPayment}
          closePaymentDialog={closePaymentDialog}
        />
      </Elements>
    </div>
  )
}

export default StripeCheckout
