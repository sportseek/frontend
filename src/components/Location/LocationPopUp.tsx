import React, { useEffect, useMemo, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import { EDIT_LOCATION_HEADER } from "utils/constants"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { Marker as LeafletMarker } from "leaflet"

import {
  updateUser,
  selectUser,
  selectUserLocation,
} from "redux/reducers/user/userSlice"

import { Location } from "types"

const useStyles = makeStyles({
  map: {
    height: 500,
  },
})

const Transition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  )
)

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditLocation = (props: Props) => {
  const classes = useStyles()

  const { open, setOpen } = props

  const user = useAppSelector(selectUser)
  const userPosition = useAppSelector(selectUserLocation) as Location
  const dispatch = useAppDispatch()

  const [pinPosition, setPinPos] = useState<Location>(userPosition)

  useEffect(() => {
    setPinPos(userPosition)
  }, [userPosition])

  const markerRef = useRef<LeafletMarker>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    const modUser = { ...user }
    modUser.location = pinPosition
    console.log(modUser)
    dispatch(updateUser(modUser))

    handleClose()
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPinPos = marker.getLatLng()
          console.log(newPinPos)
          setPinPos(marker.getLatLng())
        }
      },
    }),
    []
  )

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
      <DialogTitle id="edit-location-dialog-slide-title">
        {EDIT_LOCATION_HEADER}
      </DialogTitle>
      <DialogContent>
        <MapContainer
          className={classes.map}
          center={pinPosition}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            draggable
            eventHandlers={eventHandlers}
            position={pinPosition}
            ref={markerRef}
          />
        </MapContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditLocation
