import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, IconButton } from "@material-ui/core"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { useAppSelector } from "redux/hooks"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"
import { isEmpty } from "utils/stringUtils"
import { Location } from "types"

import { selectUserLocation } from "redux/reducers/user/userSlice"
import EditLocationDialog from "./LocationPopUp"

const useStyles = makeStyles({
  map: {
    height: 350,
  },
  cardHeader: {
    paddingBottom: 0,
  },
})

function LocationMarker() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return isEmpty(position) ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const LocationCard = () => {
  const classes = useStyles()

  const position = useAppSelector(selectUserLocation) as Location

  console.log(position)

  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Location"
        action={
          <IconButton
            color="secondary"
            aria-label="edit location"
            onClick={() => setOpen(true)}
          >
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
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
          <Marker position={position} />
        </MapContainer>
        <EditLocationDialog open={open} setOpen={setOpen} />
      </CardContent>
    </Card>
  )
}

export default LocationCard
