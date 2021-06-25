import React, { FC, useMemo, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  LinearProgress,
} from "@material-ui/core"
import { MapContainer, TileLayer } from "react-leaflet"
import { Marker as LeafletMarker } from "leaflet"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { TransitionProps } from "@material-ui/core/transitions"
import {
  prepareForValidation,
  selectLoadingUserData,
  selectHasUserErrors,
  selectUserErrors,
} from "redux/reducers/user/userSlice"
import { EDIT_LOCATION_HEADER } from "utils/constants"
import { ILocation } from "types"
import Errorbar from "components/Common/Errorbar"

import DraggableMarker from "./DraggableMarker"

const useStyles = makeStyles(() => ({
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
}))

const Transition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  )
)

type Props = {
  open: boolean
  position: ILocation
  updatePos: (pos: ILocation) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditLocation: FC<Props> = (props: Props) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const hasErrors = useAppSelector(selectHasUserErrors)
  const loading = useAppSelector(selectLoadingUserData)

  const { updatePos, open, setOpen, position } = props

  const [pinPos, setPinPos] = useState<ILocation>(position)

  const globalErrors = useAppSelector(selectUserErrors)

  const showErrorBar = globalErrors instanceof Array && globalErrors.length > 0

  const markerRef = useRef<LeafletMarker>(null)

  const handleClose = () => {
    dispatch(prepareForValidation())
    setOpen(false)
  }

  const handleSave = () => {
    dispatch(prepareForValidation())
    updatePos(pinPos as ILocation)
    if (!hasErrors) handleClose()
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
        {loading && <LinearProgress color="secondary" />}
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
      <DialogActions className={classes.actions}>
        <Button onClick={handleSave} color="secondary" variant="contained">
          Save
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
      {showErrorBar && <Errorbar errors={globalErrors as []} />}
    </Dialog>
  )
}

export default EditLocation
