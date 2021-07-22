import React, { FC, useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { GoogleMap, Marker } from "@react-google-maps/api"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  LinearProgress,
  DialogContentText,
} from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { TransitionProps } from "@material-ui/core/transitions"
import {
  prepareForValidation,
  selectLoadingUserData,
  selectHasUserErrors,
  selectUserErrors,
} from "redux/reducers/user/userSlice"
import { EDIT_LOCATION_HEADER } from "utils/constants"
import { IAddress, ILocation } from "types"
import Errorbar from "components/Common/Errorbar"
import { getFormattedAddress } from "utils/stringUtils"
import { getAddress } from "utils/geoCodeUtils"

const containerStyle = {
  width: "100%",
  height: "500px",
}

const useStyles = makeStyles((theme) => ({
  map: {
    height: 500,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
  title: {
    paddingBottom: 0,
  },
  contenttext: {
    paddingTop: 0,
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    color: theme.palette.primary.main,
  },
}))

const Transition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  )
)

type Props = {
  open: boolean
  position: ILocation
  updatePos: (pos: ILocation, add: IAddress) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userAddress: IAddress
}

const EditLocation: FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const hasErrors = useAppSelector(selectHasUserErrors)
  const loading = useAppSelector(selectLoadingUserData)

  const { updatePos, open, setOpen, position, userAddress } = props

  const [pinPos, setPinPos] = useState<ILocation>(position)
  const [address, setAddress] = useState<IAddress>({} as IAddress)

  const [disableSave, setSaveDisabled] = useState<boolean>(true)

  const globalErrors = useAppSelector(selectUserErrors)

  const showErrorBar = globalErrors instanceof Array && globalErrors.length > 0

  const handleClose = useCallback(() => {
    dispatch(prepareForValidation())
    setOpen(false)
    setSaveDisabled(true)
  }, [dispatch, setOpen])

  const handleSave = () => {
    dispatch(prepareForValidation())
    updatePos(pinPos as ILocation, address)
    if (!hasErrors) handleClose()
  }

  useEffect(() => {
    const fetchAddress = async (location: ILocation) => {
      const add = await getAddress(location)
      setAddress(add)
    }

    if (JSON.stringify(pinPos) !== JSON.stringify(position))
      fetchAddress(pinPos)
  }, [pinPos, position, userAddress])

  useEffect(() => {
    if (open) setAddress(userAddress)
    else setAddress({} as IAddress)
  }, [open, userAddress])

  useEffect(() => {
    if (!hasErrors && !loading) {
      handleClose()
    }
  }, [handleClose, hasErrors, loading])

  const onDragEnd = (e: { latLng: { lat: () => any; lng: () => any } }) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setPinPos({ lat, lng })
    setSaveDisabled(false)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="edit-location-dialog-slide-title"
      aria-describedby="edit-location-slide-description"
    >
      <DialogTitle
        className={classes.title}
        id="edit-location-dialog-slide-title"
      >
        {EDIT_LOCATION_HEADER}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.contenttext}>
          {getFormattedAddress(address)}
        </DialogContentText>
        {loading && <LinearProgress color="primary" />}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
        >
          <Marker position={position} draggable onDragEnd={onDragEnd} />
        </GoogleMap>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          disabled={disableSave}
          onClick={handleSave}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
      </DialogActions>
      {showErrorBar && <Errorbar errors={globalErrors as []} />}
    </Dialog>
  )
}

export default EditLocation
