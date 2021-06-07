import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { connect } from "react-redux"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
// import sampleImage from "utils/stockarenaimage.jpg"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const EventCard = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          image="https://img.bundesliga.com/tachyon/sites/2/2019/02/775011925SH026.jpg?crop=670px,980px,2322px,1305px&fit=1140"
          className={classes.media}
          title="Event 1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Event Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Location
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Show Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default EventCard
