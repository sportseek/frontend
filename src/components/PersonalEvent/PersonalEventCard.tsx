import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useAppDispatch } from "redux/hooks"
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
import { deletePEvent } from "redux/reducers/pEvent/pEventSlice"

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
  const dispatch = useAppDispatch()

  const { _id: id, title, description, start, end } = event

  const handleDelete = () => {
    dispatch(deletePEvent(id))
    handleClose()
  }

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
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Start
            </Typography>
            <Typography variant="body2" component="p">
              {getReadableDate(start)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              End
            </Typography>
            <Typography variant="body2" component="p">
              {getReadableDate(end)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Tooltip title="Delete event" placement="left">
          <IconButton aria-label="delete event" onClick={handleDelete}>
            <Delete color="secondary" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

type PEventProps = {
  event: IPersonalEvent
  handleClose: () => void
}

export default PersonalEventCard
