import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core"
import { CloseRounded, Delete } from "@material-ui/icons"
import Tooltip from "components/Common/Tooltip"
import { IPersonalEvent } from "types"
import { getReadableDate } from "utils/stringUtils"

const useStyles = makeStyles({
  card: {
    width: 400,
  },
  cardHeader: {
    padding: 8,
  },
  cardContent: {
    padding: 8,
  },
  cardActions: {
    padding: 4,
    justifyContent: "flex-end",
  },
})

const PersonalEventCard = (props: PEventProps) => {
  const classes = useStyles()
  const { event, handleClose } = props

  return (
    <Card className={classes.card}>
      <CardHeader
        title="Details"
        className={classes.cardHeader}
        action={
          <Tooltip title="close" placement="left">
            <IconButton
              color="secondary"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Title
            </Typography>
            <Typography variant="body2" component="p">
              {event.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2" component="p">
              {event.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Start
            </Typography>
            <Typography variant="body2" component="p">
              {getReadableDate(event.start)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              End
            </Typography>
            <Typography variant="body2" component="p">
              {getReadableDate(event.end)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="add to favorites">
          <Delete color="secondary" />
        </IconButton>
      </CardActions>
    </Card>
  )
}

type PEventProps = {
  event: IPersonalEvent
  handleClose: () => void
}

export default PersonalEventCard
