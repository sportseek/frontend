import React, { FC, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"

import { isEmpty } from "utils/stringUtils"
import { ILocation, IUser } from "types"
import Tooltip from "components/Common/Tooltip"

import { selectUserLocation, updateUser } from "redux/reducers/user/userSlice"

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
  const { position } = props
  const map = useMap()
  map.flyTo(position, map.getZoom())

  return isEmpty(position) ? null : <Marker position={position} />
}

type LocationCardProps = {
  editable?: boolean
  position?: ILocation
}

const LocationCard: FC<LocationCardProps> = (props: LocationCardProps) => {
  const { editable, position = {} as ILocation } = props
  const classes = useStyles()
  const userPosition = useAppSelector(selectUserLocation)
  const dispatch = useAppDispatch()
  const pinPosition = isEmpty(position) ? userPosition : position
  const [open, setOpen] = useState(false)

  const updatePos = (location: ILocation) => {
    dispatch(updateUser({ location } as IUser))
  }

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title="Location"
        action={
          editable && (
            <Tooltip title="Edit location" placement="left">
              <IconButton
                color="secondary"
                aria-label="edit location"
                onClick={() => setOpen(true)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardContent>
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
          <LocationMarker position={pinPosition} />
        </MapContainer>
        {open && (
          <EditLocationDialog
            open={open}
            setOpen={setOpen}
            updatePos={updatePos}
            position={pinPosition}
          />
        )}
      </CardContent>
    </Card>
  )
}

LocationCard.defaultProps = {
  editable: true,
  position: {} as ILocation,
}

export default LocationCard
