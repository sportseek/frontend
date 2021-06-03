import React, { useCallback, useMemo, useRef, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {Card, IconButton} from "@material-ui/core"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import {EditLocationRounded as Edit} from "@material-ui/icons"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import { Marker as LeafletMarker } from "leaflet"

const center = { lat: 48.137154, lng: 11.576124 }

const useStyles = makeStyles({
  map: {
    height: 400,
  },
})

const Location = () => {
  const classes = useStyles()

  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef<LeafletMarker>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Card>
      <CardHeader title="Location" action={
          <IconButton aria-label="edit location" onClick={toggleDraggable}>
            <Edit />
          </IconButton>
        }/>
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
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            <Popup minWidth={90}>
              <span>
                {draggable
                  ? "Marker is draggable"
                  : "Click here to make marker draggable"}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  )
}

export default Location
