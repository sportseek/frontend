/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Grid,
  DialogTitle,
  CircularProgress,
  TextField,
} from "@material-ui/core"
import { EditRounded } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectLoggedInUser,
  selectLoadingUserData,
  updateUser,
  updateProfilePic,
} from "redux/reducers/user/userSlice"
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
  input: {
    display: "none",
  },
}))

const UserDetailsForm = (props: DetailsFormProps) => {
  const classes = useStyles()
  const oldPlayer = useAppSelector(selectLoggedInUser) as IPlayer
  const loading = useAppSelector(selectLoadingUserData)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const { open, handleClose: close } = props

  const {
    firstName,
    lastName,
    phone,
    email,
    address: oldAddress,
    profileImageUrl = "",
  } = oldPlayer

  const { current } = inputRef

  const [disabled, setDisabled] = useState(true)

  const [player, setPlayer] = useState<PlayerPayload>({
    firstName,
    lastName,
    email,
    phone,
  })
  const [address, setAddress] = useState<IAddress>(oldAddress)

  const handleClose = () => {
    setDisabled(true)
    close()
  }

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
    setDisabled(false)
  }

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
    setDisabled(false)
  }

  const handleImageChange = useCallback(
    ({ target: { files } }) => {
      const image = files[0]
      const formData = new FormData()
      formData.append("image", image)
      dispatch(updateProfilePic(formData))
      if (current) current.value = ""
      setDisabled(false)
    },
    [current, dispatch]
  )

  const handleClick = useCallback(() => {
    if (current) current.click()
  }, [current])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
      <DialogContent className={classes.main}>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <input
              accept="image/*"
              ref={inputRef}
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                onClick={handleClick}
                aria-label="upload picture"
                component="span"
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={<EditRounded color="secondary" />}
                >
                  {loading ? (
                    <Avatar
                      src=""
                      style={{
                        margin: "10px",
                        width: "150px",
                        height: "150px",
                      }}
                    >
                      <CircularProgress color="secondary" />
                    </Avatar>
                  ) : (
                    <Avatar
                      src={profileImageUrl}
                      style={{
                        margin: "10px",
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  )}
                </Badge>
              </IconButton>
            </label>
          </Grid>
          <Grid item lg>
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
                  disabled
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          color="secondary"
          variant="contained"
          disabled={disabled}
          onClick={handleSave}
        >
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
