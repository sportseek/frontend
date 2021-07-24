import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
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
import { SearchEventPayload } from "types/Event"
import Tooltip from "components/Common/Tooltip"
import ClearIcon from "@material-ui/icons/Clear"
import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import moment from "moment"

const useStyles = makeStyles(() => ({
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
    borderBottom: "1px solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid",
    padding: "8px",
  },
  chipContainer: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "12px",
  },
  singleChip: {
    marginRight: "4px",
    marginBottom: "4px",
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
  const [filterPayload, setFilterPayload] = useState<SearchEventPayload>({})
  const user = useAppSelector(selectLoggedInUser) as IArenaOwner
  const arenaEvents = useAppSelector(selectEvents)
  const reloadEvents = useAppSelector(selectReloadEvents)
  const totalArenaEvents = useAppSelector(selectTotalArenaEvents)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getEvents({
        ...filterPayload,
        pageNumber,
        pageSize,
      })
    )
  }, [dispatch, filterPayload, pageNumber, pageSize, reloadEvents])

  useEffect(() => {
    setPageSize(5)
    setPageNumber(1)
  }, [totalArenaEvents])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "pageSize") {
      setPageSize(value)
      setPageNumber(1)
      dispatch(
        getEvents({
          ...filterPayload,
          pageNumber: 1,
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
        ...filterPayload,
        pageNumber: value,
        pageSize,
      })
    )
  }

  const getArenaFilterPayload = (payload: SearchEventPayload) => {
    setFilterPayload(payload)
    dispatch(
      getEvents({
        ...payload,
        pageNumber: 1,
        pageSize: 5,
      })
    )
  }

  const clearFilters = () => {
    setFilterPayload({})
    dispatch(
      getEvents({
        pageNumber: 1,
        pageSize: 5,
      })
    )
  }

  const clearSingleFilter = (filterName: any) => {
    const filters: any = { ...filterPayload }
    delete filters[filterName]
    setFilterPayload(filters)
    dispatch(
      getEvents({
        ...filters,
        pageNumber: 1,
        pageSize: 5,
      })
    )
  }

  return (
    <div>
      <Card raised className={classes.card}>
        <CardHeader className={classes.cardHeader} title="Events" />
        <CardActions className={classes.cardActions}>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              disabled={user.profileImageUrl ? false : true}
              onClick={handleClickOpen}
            >
              Create Event
            </Button>
            <ArenaEventFilter getFilterPayload={getArenaFilterPayload} />

            <Tooltip title="clear filter">
              <IconButton
                aria-label="filter"
                color="inherit"
                onClick={clearFilters}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>

            {!user.profileImageUrl && (
              <h4>
                Upload your arena image and setup arena location to start
                creating events
              </h4>
            )}

            <CreateEventDialog
              open={open}
              onClose={handleClose}
              isUpdate={false}
            />
          </div>
          <div>
            {filterPayload.eventTitle && (
              <Chip
                className={classes.singleChip}
                label={`title: ${filterPayload.eventTitle}`}
                onDelete={() => clearSingleFilter("eventTitle")}
                deleteIcon={<ClearIcon />}
              />
            )}
            {filterPayload.sportType && (
              <Chip
                className={classes.singleChip}
                label={`Sport type: ${filterPayload.sportType}`}
                onDelete={() => clearSingleFilter("sportType")}
                deleteIcon={<ClearIcon />}
              />
            )}
            {filterPayload.eventStartTime && (
              <Chip
                className={classes.singleChip}
                label={`Event start: ${moment(
                  filterPayload.eventStartTime
                ).format("MMMM Do, YYYY")}`}
                onDelete={() => clearSingleFilter("eventStartTime")}
                deleteIcon={<ClearIcon />}
              />
            )}
            {filterPayload.eventEndTime && (
              <Chip
                className={classes.singleChip}
                label={`Event end: ${moment(filterPayload.eventEndTime).format(
                  "MMMM Do, YYYY"
                )}`}
                onDelete={() => clearSingleFilter("eventEndTime")}
                deleteIcon={<ClearIcon />}
              />
            )}
          </div>
        </CardActions>
        <CardContent className={classes.cardContent}>
          {arenaEvents.length > 0 &&
            arenaEvents.map((item, idx) => (
              <ArenaEventCard key={idx} event={item} />
            ))}
          {arenaEvents.length === 0 && (
            <div>
              <h3>No events</h3>
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
            count={Math.ceil(totalArenaEvents / pageSize)}
            page={pageNumber}
            onChange={handlePageChange}
          />
        </div>
      </Card>
    </div>
  )
}

export default ArenaEvents
