import React, { FC, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Tooltip as MapTooltip,
} from "react-leaflet"

import { getFormattedAddress, isEmpty } from "utils/stringUtils"
import { IAddress, ILocation, IUser } from "types"
import Tooltip from "components/Common/Tooltip"

import {
  selectLoggedInUser,
  selectUserLocation,
  updateUser,
} from "redux/reducers/user/userSlice"

import EditLocationDialog from "./EditLocationPopUpOld"

const useStyles = makeStyles({
  map: {
    height: 360,
  },
  cardHeader: {
    paddingBottom: 0,
  },
})

type MarkerProps = {
  position: ILocation
  address: IAddress
}

function LocationMarker(props: MarkerProps) {
  const { position, address } = props
  const map = useMap()
  map.flyTo(position, map.getZoom())

  return isEmpty(position) ? null : (
    <Marker position={position}>
      <MapTooltip>{getFormattedAddress(address)}</MapTooltip>
    </Marker>
  )
}

type LocationCardProps = {
  editable?: boolean
  position?: ILocation
}

const LocationCard: FC<LocationCardProps> = (props: LocationCardProps) => {
  const { editable, position = {} as ILocation } = props
  const classes = useStyles()
  const userPosition = useAppSelector(selectUserLocation)
  const { address: userAddress } = useAppSelector(selectLoggedInUser)
  const dispatch = useAppDispatch()
  const pinPosition = isEmpty(position) ? userPosition : position
  const [open, setOpen] = useState(false)

  const updatePos = (location: ILocation, address: IAddress) => {
    dispatch(updateUser({ location, address } as IUser))
  }

  return (
    <Card raised>
      <CardHeader
        className={classes.cardHeader}
        title="Location"
        action={
          editable && (
            <Tooltip title="Edit location" placement="left">
              <IconButton
                color="primary"
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
          <LocationMarker position={pinPosition} address={userAddress} />
        </MapContainer>
        {open && (
          <EditLocationDialog
            open={open}
            setOpen={setOpen}
            updatePos={updatePos}
            position={pinPosition}
            userAddress={userAddress}
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
