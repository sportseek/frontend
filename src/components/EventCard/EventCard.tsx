import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"
import { IEvent, ILocation } from "types"
import moment from "moment"
import { People, Star, Euro } from "@material-ui/icons"
import Tooltip from "components/Common/Tooltip"
import Grid from "@material-ui/core/Grid"
import { getFormattedAddress } from "utils/stringUtils"
import { generateAddressFromLocation } from "utils/geoCodeUtils"
import { NavLink } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    background: theme.palette.common.white,
  },
  media: {
    height: 140,
  },
  content: {
    background: theme.palette.common.white,
  },
  customLink: {
    textDecoration: "none",
    color: "black",
  },
  iconStyle: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
}))

type Props = {
  event: IEvent
}
const EventCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const { event } = props
  const [address, setAddress] = useState<String>("")

  const href = `/eventdetails/${event._id}`

  useEffect(() => {
    const getAddress = async (location: ILocation) => {
      const add = await generateAddressFromLocation(location)
      setAddress(add)
    }
    let add = ""
    if (event.address) {
      add = getFormattedAddress(event.address)
      setAddress(add)
    } else {
      getAddress(event.location)
    }
  }, [event.address, event.location])

  return (
    <Link component={NavLink} to={href} underline="none">
      <Card className={classes.root} raised>
        <CardActionArea>
          <CardMedia
            image={event.eventImageUrl}
            className={classes.media}
            title="Event 1"
          />
          <CardContent className={classes.content}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="h2">
                  {event.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Date: <b>{moment(event.start).format("MMMM Do, YYYY")}</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Time: <b>{moment(event.start).format("LT")}</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Type:{" "}
                  <b>
                    {event.sportType.charAt(0).toUpperCase() +
                      event.sportType.slice(1)}
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.iconStyle}>
                  <Tooltip title="Entry Fee">
                    <Euro color="primary" style={{ marginRight: "4px" }} />
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>{event.entryFee}</b>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.iconStyle}>
                  <Tooltip title="Participating/Maximum Players">
                    <People color="primary" style={{ marginRight: "4px" }} />
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>
                      {event.registeredPlayers.length}/{event.maxPlayers}
                    </b>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.iconStyle}>
                  <Tooltip title="Interested">
                    <Star color="primary" style={{ marginRight: "4px" }} />
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>{event.interestedPlayers.length}</b>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default EventCard
