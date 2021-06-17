import React, { ChangeEvent, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { selectLoggedInUser, updateUser } from "redux/reducers/user/userSlice"
import { IAddress, IPlayer, PlayerPayload } from "types"

type DetailsFormProps = {
  open: boolean
  handleClose: () => void
}

const useStyles = makeStyles((theme) => ({
  main: {
    overflow: "hidden",
    margin: "auto",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}))

const UserDetailsForm = (props: DetailsFormProps) => {
  const classes = useStyles()
  const oldPlayer = useAppSelector(selectLoggedInUser) as IPlayer
  const dispatch = useAppDispatch()

  const { open, handleClose } = props

  const { firstName, lastName, phone, email, address: oldAddress } = oldPlayer

  const [player, setPlayer] = useState<PlayerPayload>({
    firstName,
    lastName,
    email,
    phone,
  })
  const [address, setAddress] = useState<IAddress>(oldAddress)

  const handleSave = () => {
    const tempuser = { ...oldPlayer, ...player }
    tempuser.address = { ...tempuser.address, ...address }
    dispatch(updateUser(tempuser))
    handleClose()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
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
      <DialogContent className={classes.main}>
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
              id="street"
              name="street"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              value={address.street}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="streetAddtional"
              name="streetAddtional"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              value={address.streetAddtional}
              onChange={handleAddressChange}
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
              value={address.city}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              value={address.state}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="postcode"
              name="postcode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              value={address.postcode}
              onChange={handleAddressChange}
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
              value={address.country}
              onChange={handleAddressChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button color="secondary" variant="contained" onClick={handleSave}>
          Update Profile
        </Button>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDetailsForm
