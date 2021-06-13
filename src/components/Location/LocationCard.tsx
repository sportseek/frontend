import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"

import { isEmpty } from "utils/stringUtils"
import { ILocation } from "types"
import Tooltip from "components/Common/Tooltip"

import {
  selectUser,
  selectUserLocation,
  updateUser,
} from "redux/reducers/user/userSlice"

import EditLocationDialog from "./EditLocationPopUp"

const useStyles = makeStyles({
  map: {
    height: 350,
  },
  cardHeader: {
    paddingBottom: 0,
  },
})


type MarkerProps = {
  position: ILocation
}

function LocationMarker(props: MarkerProps) {
  let { position } = props
  const map = useMap()
  map.flyTo(position, map.getZoom())

  return isEmpty(position) ? null : <Marker position={position} />
}

const LocationCard = () => {
  const classes = useStyles()
  const user = useAppSelector(selectUser)
  const userPosition = useAppSelector(selectUserLocation) as ILocation
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  const updatePos = (pinPosition: ILocation) => {
    const modUser = { ...user }
    modUser.location = pinPosition
    dispatch(updateUser(modUser))
  }

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Location"
        action={
          <Tooltip title="Edit location" placement="left">
            <IconButton
              color="secondary"
              aria-label="edit location"
              onClick={() => setOpen(true)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <MapContainer
          className={classes.map}
          center={userPosition}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={userPosition} />
        </MapContainer>
        {open && (
          <EditLocationDialog
            open={open}
            setOpen={setOpen}
            updatePos={updatePos}
            position={userPosition}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default LocationCard
