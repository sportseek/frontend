import React from "react"
import { Marker, useMap } from "react-leaflet"
import L, { Marker as LeafletMarker } from "leaflet"
import { ILocation } from "types"

type DraggableMarkerProps = {
  eventHandlers: {
    dragend(): void
  }
  position: ILocation
  markerRef: React.RefObject<LeafletMarker<any>>
}

const DraggableMarker = (props: DraggableMarkerProps) => {
  const { eventHandlers, position, markerRef } = props
  const map = useMap()

  const icon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [35, 51],
    iconAnchor: [18, 51],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  map.locate()

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={icon}
    />
  )
}

export default DraggableMarker
