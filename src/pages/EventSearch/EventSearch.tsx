/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { Grid, Grow, Theme } from "@material-ui/core"
import Helmet from "react-helmet"
import EventCard from "components/EventCard"
import FilterEvents from "components/FilterEvents"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  getMinMaxPrice,
  getMinMaxDate,
  selectAllEvents,
  selectEventMaxDate,
  selectTotalEvents,
} from "redux/reducers/event/eventSlice"
import moment from "moment"
import Fab from "@material-ui/core/Fab"
import ArrowUp from "@material-ui/icons/KeyboardArrowUp"
import Tooltip from "components/Common/Tooltip"
import Pagination from "@material-ui/lab/Pagination"
import { IEvent } from "types"
import { SearchEventPayload } from "types/Event"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      display: "flex",
      padding: theme.spacing(1),
      marginRight: theme.filterbar.width,
    },
    root: {
      flex: 1,
      display: "flex",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(5),
      right: theme.spacing(40),
    },
  })
)

const EventSearch = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const allEvents = useAppSelector(selectAllEvents)
  const maxDate = useAppSelector(selectEventMaxDate)
  const totalEvents = useAppSelector(selectTotalEvents)
  const [page, setPage] = React.useState(1)
  const [filterPayload, setFilterPayload] = useState<SearchEventPayload>({})
  const pageSize = 9

  const rootDivRef = useRef<HTMLDivElement>(null)
  const useMountEffect = (scroll: any) => useEffect(scroll, [scroll])

  const executeScroll = () => {
    if (rootDivRef && rootDivRef.current)
      rootDivRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }

  useMountEffect(executeScroll)

  useEffect(() => {
    setPage(1)
  }, [totalEvents])

  useEffect(() => {
    dispatch(getMinMaxDate())
  }, [dispatch])

  useEffect(() => {
    if (maxDate) {
      setFilterPayload({
        eventStartTime: new Date(
          moment().format("YYYY-MM-DDTHH:MM")
        ).toISOString(),
        eventEndTime: new Date(
          moment(maxDate).format("YYYY-MM-DDTHH:MM")
        ).toISOString(),
        sortBy: "start",
        sortValue: 1,
      })

      dispatch(
        getAllEvents({
          // ...filterPayload,
          eventStartTime: new Date(
            moment().format("YYYY-MM-DDTHH:MM")
          ).toISOString(),
          eventEndTime: new Date(
            moment(maxDate).format("YYYY-MM-DDTHH:MM")
          ).toISOString(),
          sortBy: "start",
          sortValue: 1,
          pageNumber: 1,
          pageSize: pageSize,
        })
      )
    }
    dispatch(getMinMaxPrice())
  }, [dispatch, maxDate])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
    dispatch(
      getAllEvents({
        ...filterPayload,
        pageNumber: value,
        pageSize: pageSize,
      })
    )
  }

  const getEventFilterPayload = (payload: SearchEventPayload) => {
    setFilterPayload(payload)
    setPage(1)
    dispatch(
      getAllEvents({
        ...payload,
        pageNumber: 1,
        pageSize: pageSize,
      })
    )
  }

  return (
    <div className={classes.root} ref={rootDivRef}>
      <div style={{ width: "100%" }}>
        <Helmet title="Search events" />

        <main className={classes.content}>
          <Grid
            container
            spacing={4}
            justify="space-around"
            alignItems="center"
          >
            {allEvents.map((item: IEvent, index: number) => (
              <Grow
                in
                key={`${item._id} ${index}`}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000 + index * 150}
              >
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <EventCard event={item} />
                </Grid>
              </Grow>
            ))}
            <Grid container spacing={4} justify="center" alignItems="center">
              <Grid item>
                <Pagination
                  color="secondary"
                  count={Math.ceil(totalEvents / pageSize)}
                  page={page}
                  onChange={handlePageChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </main>
        <FilterEvents getEventFilterPayload={getEventFilterPayload} />
        <Tooltip title="Go to Top">
          <Fab
            color="secondary"
            onClick={executeScroll}
            className={classes.fab}
          >
            <ArrowUp />
          </Fab>
        </Tooltip>
      </div>
    </div>
  )
}

export default EventSearch
