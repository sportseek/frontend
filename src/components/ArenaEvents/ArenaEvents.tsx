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
  getEvents,
  selectEvents,
  selectReloadEvents,
  selectTotalArenaEvents,
} from "redux/reducers/event/eventSlice"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IArenaOwner } from "types"

import ArenaEventFilter from "components/ArenaEventFilter"
import Pagination from "@material-ui/lab/Pagination"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

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
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "16px",
  },
}))

const pageSizeNumbers = [
  {
    id: 5,
    name: 5,
  },
  {
    id: 10,
    name: 10,
  },
  {
    id: 20,
    name: 20,
  },
]

const ArenaEvents = () => {
  const [pageSize, setPageSize] = useState(5)
  const [pageNumber, setPageNumber] = React.useState(1)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const user = useAppSelector(selectLoggedInUser) as IArenaOwner
  const arenaEvents = useAppSelector(selectEvents)
  const reloadEvents = useAppSelector(selectReloadEvents)
  const totalArenaEvents = useAppSelector(selectTotalArenaEvents)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getEvents({
        pageNumber,
        pageSize,
      })
    )
  }, [dispatch, reloadEvents])

  useEffect(() => {
    setPageSize(5)
    setPageNumber(1)
  }, [totalArenaEvents])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "pageSize") {
      setPageSize(value)
      dispatch(
        getEvents({
          pageNumber,
          pageSize: value,
        })
      )
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value)
    dispatch(
      getEvents({
        pageNumber: value,
        pageSize,
      })
    )
  }

  return (
    <div>
      <Card raised className={classes.card}>
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
          <ArenaEventFilter />
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
          {arenaEvents.length > 0 &&
            arenaEvents.map((item, idx) => (
              <ArenaEventCard key={idx} event={item} />
            ))}
          {arenaEvents.length === 0 && (
            <div>
              <h3>You have not created any events yet</h3>
            </div>
          )}
        </CardContent>
        <div className={classes.pagination}>
          <TextField
            select
            value={pageSize}
            onChange={handleInputChange}
            id="pageSize"
            name="pageSize"
          >
            {pageSizeNumbers.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Pagination
            count={Math.ceil( totalArenaEvents / pageSize)}
            page={pageNumber}
            onChange={handlePageChange}
          />
        </div>
      </Card>
    </div>
  )
}

export default ArenaEvents
