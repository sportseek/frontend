/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
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
  Typography,
} from "@material-ui/core"
import { EditRounded } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  prepareForValidation,
  selectLoadingUserData,
  updateUser,
  updateProfilePic,
  selectHasUserErrors,
  selectUserErrors,
} from "redux/reducers/user/userSlice"
import Errorbar from "components/Common/Errorbar"
import { IAddress, ILocation, InitialAddress, IPlayer } from "types"
import { getLatLngFromAddress } from "utils/geoCodeUtils"
import { getFormattedAddress } from "utils/stringUtils"

type DetailsFormProps = {
  open: boolean
  handleClose: () => void
  firstName: string
  lastName: string
  email: string
  phone: string
  oldLocation: ILocation
  oldAddress: IAddress
  profileImageUrl: string
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

const PlayerDetailsForm = (props: DetailsFormProps) => {
  const classes = useStyles()
  const loading = useAppSelector(selectLoadingUserData)
  const hasErrors = useAppSelector(selectHasUserErrors)
  const userErrors = useAppSelector(selectUserErrors)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const [imageClicked, setImageClicked] = useState(false)

  const errors = userErrors as IPlayer
  const globalErrors = userErrors as []

  const showErrorBar = globalErrors instanceof Array && globalErrors.length > 0

  const {
    open,
    handleClose: close,
    firstName,
    lastName,
    phone,
    email,
    oldAddress,
    oldLocation,
    profileImageUrl = "",
  } = props

  const { current } = inputRef

  const [disabled, setDisabled] = useState(true)

  const password = ""
  const oldpassword = ""

  const [player, setPlayer] = useState({
    firstName,
    lastName,
    password,
    oldpassword,
    email,
    phone,
    address: oldAddress,
    location: oldLocation,
  })
  const [address, setAddress] = useState<IAddress>(oldAddress)

  const handleClose = useCallback(() => {
    setDisabled(true)
    setImageClicked(false)
    dispatch(prepareForValidation())
    close()
  }, [dispatch, close])

  const handleSave = async () => {
    const tempuser = { ...player }
    if (JSON.stringify(address) !== JSON.stringify(oldAddress)) {
      const loc = await getLatLngFromAddress(getFormattedAddress(address))
      if (loc) tempuser.location = loc
    }
    tempuser.address = { ...tempuser.address, ...address }
    dispatch(prepareForValidation())
    dispatch(updateUser(tempuser as IPlayer))
    setImageClicked(false)
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
      dispatch(prepareForValidation())
      dispatch(updateProfilePic(formData))
      if (current) current.value = ""
      setImageClicked(true)
    },
    [current, dispatch]
  )

  const handleClick = useCallback(() => {
    if (current) current.click()
  }, [current])

  useEffect(() => {
    if (open) {
      setPlayer({
        firstName,
        lastName,
        password,
        oldpassword,
        email,
        phone,
        address: oldAddress,
        location: oldLocation,
      })
      setAddress(oldAddress)
    } else {
      setPlayer({
        firstName: "",
        lastName: "",
        password: "",
        oldpassword: "",
        email: "",
        phone: "",
        address: InitialAddress,
        location: { lat: 0, lng: 0 },
      })
      setAddress(InitialAddress)
    }
  }, [email, firstName, lastName, oldAddress, phone, open, oldLocation])

  useEffect(() => {
    if (!hasErrors && !imageClicked && !loading) {
      handleClose()
    }
  }, [handleClose, hasErrors, imageClicked, loading])

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
                  badgeContent={<EditRounded color="primary" />}
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
                      <CircularProgress color="primary" />
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
            <Typography>{email}</Typography>
          </Grid>
          <Grid item lg>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.firstName}
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  value={player.firstName}
                  onChange={handleChange}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!errors.lastName}
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  value={player.lastName}
                  onChange={handleChange}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  error={!!errors.phone}
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  autoComplete="phone"
                  value={player.phone}
                  onChange={handleChange}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={!!errors.oldpassword}
                  id="oldpassword"
                  name="oldpassword"
                  type="password"
                  label="Old password"
                  fullWidth
                  autoComplete="password"
                  value={player.oldpassword}
                  onChange={handleChange}
                  helperText={errors.oldpassword}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={!!errors.password}
                  id="password"
                  name="password"
                  label="New password"
                  type="password"
                  fullWidth
                  autoComplete="current-password"
                  value={player.password}
                  onChange={handleChange}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.address?.street}
                  required
                  id="street"
                  name="street"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  value={address.street}
                  onChange={handleAddressChange}
                  helperText={errors.address?.street}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.address?.streetAddtional}
                  id="streetAddtional"
                  name="streetAddtional"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  value={address.streetAddtional}
                  onChange={handleAddressChange}
                  helperText={errors.address?.streetAddtional}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.address?.city}
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={address.city}
                  onChange={handleAddressChange}
                  helperText={errors.address?.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.address?.state}
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  value={address.state}
                  onChange={handleAddressChange}
                  helperText={errors.address?.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.address?.postcode}
                  required
                  id="postcode"
                  name="postcode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  value={address.postcode}
                  onChange={handleAddressChange}
                  helperText={errors.address?.postcode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.address?.country}
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  value={address.country}
                  onChange={handleAddressChange}
                  helperText={errors.address?.country}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          color="primary"
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
      {showErrorBar && <Errorbar errors={globalErrors} />}
    </Dialog>
  )
}

export default PlayerDetailsForm
