import React, { FC, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core"
import { EditLocationRounded as Edit } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"

import { getFormattedAddress, isEmpty } from "utils/stringUtils"
import { IAddress, ILocation, IUser } from "types"
import Tooltip from "components/Common/Tooltip"
import { GoogleMap, Marker } from "@react-google-maps/api"

import {
  selectLoggedInUser,
  selectUserLocation,
  updateUser,
} from "redux/reducers/user/userSlice"

import EditLocationDialog from "./EditLocationPopUp"

const containerStyle = {
  width: "100%",
  height: "360px",
}

const useStyles = makeStyles({
  map: {
    height: 360,
  },
  cardHeader: {
    paddingBottom: 0,
  },
})

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
  const center = isEmpty(position) ? userPosition : position
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
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} title={getFormattedAddress(userAddress)} />
        </GoogleMap>

        <EditLocationDialog
          open={open}
          setOpen={setOpen}
          updatePos={updatePos}
          position={center}
          userAddress={userAddress}
        />
      </CardContent>
    </Card>
  )
}

LocationCard.defaultProps = {
  editable: true,
  position: {} as ILocation,
}

export default LocationCard
