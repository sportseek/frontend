import React, { FC } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent } from "@material-ui/core"

import { getFormattedAddress } from "utils/stringUtils"
import { GoogleMap, Marker } from "@react-google-maps/api"

import { IArenaOwner } from "types"

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
  subHeader: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 0,
  },
})

type LocationCardProps = {
  arena: IArenaOwner
}

const LocationCard: FC<LocationCardProps> = (props: LocationCardProps) => {
  const { arena } = props
  const classes = useStyles()

  const { location: center, address } = arena

  const Subheader = () => (
    <div className={classes.subHeader}>{getFormattedAddress(address)}</div>
  )

  return (
    <Card raised>
      <CardHeader
        className={classes.cardHeader}
        title="Location"
        subheader={<Subheader />}
      />
      <CardContent>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} title={getFormattedAddress(address)} />
        </GoogleMap>
      </CardContent>
    </Card>
  )
}

export default LocationCard
