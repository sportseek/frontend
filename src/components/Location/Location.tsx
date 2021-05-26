import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import { LatLngTuple } from "leaflet"

const position: LatLngTuple = [51.505, -0.09]

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  map: {
    height: "100%",
  },
})

const Wallet = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title="Wallet" />
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
        ,
      </CardContent>
    </Card>
  )
}

export default Wallet
