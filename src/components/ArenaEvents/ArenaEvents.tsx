import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import CreateEventDialog from "components/CreateEventDialog"
import React, { useState } from "react"

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
  cardContent: {
    paddingTop: 4,
    paddingLeft: 24,
    paddingBottom: 0,
  },
  cardActions: {
    paddingTop: 0,
    paddingLeft: 24,
    paddingBottom: 4,
  },
}))

const ArenaEvents = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Events" />
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Create Event
          </Button>
          <CreateEventDialog open={open} onClose={handleClose}/>
        </CardActions>
        <CardContent className={classes.cardContent}>
          hello from arena events
        </CardContent>
      </Card>
    </div>
  )
}

export default ArenaEvents
