import React, { FC, useMemo, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core"
import { MapContainer, TileLayer } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"
import { TransitionProps } from "@material-ui/core/transitions"

import { EDIT_LOCATION_HEADER } from "utils/constants"
import { Location } from "types"

import DraggableMarker from "./DraggableMarker"

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
  position: Location
  updatePos: (pos: Location) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditLocation: FC<Props> = (props: Props) => {
  const classes = useStyles()

  const { updatePos, open, setOpen, position } = props

  const [pinPos, setPinPos] = useState<Location>(position)

  const markerRef = useRef<LeafletMarker>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    updatePos(pinPos as Location)
    handleClose()
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPinPos = marker.getLatLng()
          setPinPos(newPinPos)
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
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DraggableMarker
            eventHandlers={eventHandlers}
            position={position}
            markerRef={markerRef}
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
