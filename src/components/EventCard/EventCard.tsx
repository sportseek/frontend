import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import { IEvent } from "types"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          image={event.eventImageUrl}
          className={classes.media}
          title="Event 1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Location
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          Show Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default EventCard
