import React, { ChangeEvent, useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import { useAppSelector } from "redux/hooks"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPlayer, PlayerPayload } from "types"

type DetailsFormProps = {
  open: boolean,
  handleClose: () => void
}

const useStyles = makeStyles(() => ({
  form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
  },
  input: {
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px",
  },
}));

const UserDetailsForm = (props: DetailsFormProps) => {
  const classes = useStyles()
  const oldPlayer = useAppSelector(selectLoggedInUser) as IPlayer

  const { open, handleClose } = props

  const { firstName, lastName, phone, email, address } = oldPlayer

  console.log(address)

  const [player, setPlayer] = useState<PlayerPayload>({
    firstName,
    lastName,
    email,
    phone,
    address
  })

  const handleSave = () => {
    handleClose();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                value={player.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                value={player.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                autoComplete="phone"
                value={player.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="email"
                fullWidth
                autoComplete="email"
                value={player.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                value={player.address.street}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                value={player.address.streetAddtional}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                value={player.address.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                value={player.address.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                value={player.address.postcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                value={player.address.country}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDetailsForm
