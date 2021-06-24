import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import { IEvent } from "types"
import { Link } from "react-router-dom"
import moment from "moment"
import { People, Star, Euro } from "@material-ui/icons"
import { Tooltip } from "@material-ui/core"
import Geocode from "react-geocode"
import Grid from "@material-ui/core/Grid"

Geocode.setApiKey("AIzaSyC3piWVpJ50bb8sVq-vGZnf6nbJMgyNtSE")
Geocode.setLanguage("en")

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
})

type Props = {
  event: IEvent
  openDetails: (id: string) => void
}
const EventCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const { event, openDetails } = props
  const handleClick = () => openDetails(event._id)
  const [address, setAddress] = useState("")

  useEffect(() => {
    addressGen(String(event.location.lat), String(event.location.lng))
  }, [])

  function addressGen(lat: string, lng: string) {
    var address
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        address = response.results[0].formatted_address
        console.log(address)
        setAddress(address)
      },
      (error) => {
        console.error("There was error trying to connect to GeoCode")
      }
    )
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          image={event.eventImageUrl}
          className={classes.media}
          title="Event 1"
        />
        <CardContent>
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
                  <Euro style={{ marginRight: "4px" }} />
                </Tooltip>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>{event.entryFee}</b>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.iconStyle}>
                <Tooltip title="Participating">
                  <People style={{ marginRight: "4px" }} />
                </Tooltip>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>{event.registeredPlayers.length}</b>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.iconStyle}>
                <Tooltip title="Interested">
                  <Star style={{ marginRight: "4px" }} />
                </Tooltip>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>{event.interestedPlayers.length}</b>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EventCard
