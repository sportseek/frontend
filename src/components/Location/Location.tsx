import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import { LatLngTuple } from "leaflet"

const position: LatLngTuple = [48.137154, 11.576124]

const useStyles = makeStyles({
  map: {
    height: 400,
  },
})

const Wallet = () => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader title="Location" />
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
