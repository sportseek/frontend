import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import ArenaEventCard from "components/ArenaEventCard"
import CreateEventDialog from "components/CreateEventDialog"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getArenaEvents,
  selectArenaEvents,
  selectReloadEvents,
} from "redux/reducers/event/eventSlice"
import { selectUser } from "redux/reducers/user/userSlice"
import { IArenaOwner } from "types"

import { eventsData } from "./arenaEventsData"

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
    maxHeight: "70vh",
    overflowY: "auto",
  },
  cardActions: {
    paddingTop: 0,
    paddingLeft: 24,
    paddingBottom: 4,
  },
}))

const ArenaEvents = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const user = useAppSelector(selectUser) as IArenaOwner
  const arenaEvents = useAppSelector(selectArenaEvents)
  const reloadEvents = useAppSelector(selectReloadEvents)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getArenaEvents())
  }, [reloadEvents])
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Events" />
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            disabled={user.profileImageUrl ? false : true}
            onClick={handleClickOpen}
          >
            Create Event
          </Button>
          {!user.profileImageUrl && (
            <h4>
              Upload your arena image and setup arena location to start creating
              events
            </h4>
          )}
          <CreateEventDialog
            open={open}
            onClose={handleClose}
            isUpdate={false}
          />
        </CardActions>
        <CardContent className={classes.cardContent}>
          {arenaEvents.map.length > 0 &&
            arenaEvents.map((item, idx) => (
              <ArenaEventCard key={idx} event={item} />
            ))}
          {arenaEvents.length === 0 && (
            <div>
              <h3>You have not created any events yet</h3>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ArenaEvents
