import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, IconButton } from "@material-ui/core"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import EditLocationDialog from "./LocationPopUp"

const center = { lat: 48.137154, lng: 11.576124 }

const useStyles = makeStyles({
  map: {
    height: 350,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardContent: {},
})

const Location = () => {
  const classes = useStyles()

  const [position, setPosition] = useState(center)

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
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        {open && <EditLocationDialog open={open} setOpen={setOpen} />}
      </CardContent>
    </Card>
  )
}

export default Location
