/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState, useRef } from "react"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { Grid, Grow, Theme } from "@material-ui/core"
import Helmet from "react-helmet"
import TabPanel from "components/Common/TabPanel"
import EventDetailsView from "pages/EventDetails"
import EventCard from "components/EventCard"
import FilterEvents from "components/FilterEvents"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  getMinMaxPrice,
  getMinMaxDate,
  selectAllEvents,
  selectCurrentEventId,
  setCurEventId,
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
  const useMountEffect = (fun: any) => useEffect(fun, [fun])

  const myRef = useRef<null | HTMLDivElement>(null)

  const executeScroll = () => {
    myRef.current!.scrollIntoView({
      behavior: "smooth",
    })
  }
  useMountEffect(executeScroll)

  const classes = useStyles()

  const dispatch = useAppDispatch()
  const allEvents = useAppSelector(selectAllEvents)
  const maxDate = useAppSelector(selectEventMaxDate)
  const eventId = useAppSelector(selectCurrentEventId)
  const totalEvents = useAppSelector(selectTotalEvents)
  const [tabIndex, setTabIndex] = useState(0)
  const [page, setPage] = React.useState(1)
  const [filterPayload, setFilterPayload] = useState<SearchEventPayload>({})
  const pageSize = 9

  const gotoEventDetails = useCallback(
    (id: string) => {
      setTabIndex(1)
      dispatch(setCurEventId(id))
    },
    [dispatch]
  )

  const goBack = useCallback(() => {
    setTabIndex(0)
    dispatch(setCurEventId(""))
  }, [dispatch])

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
          pageNumber: page,
          pageSize,
        })
      )
    }
    dispatch(getMinMaxPrice())
  }, [dispatch, tabIndex, maxDate, page])

  useEffect(() => {
    if (eventId) gotoEventDetails(eventId)
    else goBack()
  }, [eventId, goBack, gotoEventDetails])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
    dispatch(
      getAllEvents({
        ...filterPayload,
        // eventStartTime: new Date(
        //   moment().format("YYYY-MM-DDTHH:MM")
        // ).toISOString(),
        // eventEndTime: new Date(
        //   moment(maxDate).format("YYYY-MM-DDTHH:MM")
        // ).toISOString(),
        // sortBy: "start",
        // sortValue: 1,
        pageNumber: value,
        pageSize,
      })
    )
  }

  const getEventFilterPayload = (payload: SearchEventPayload) => {
    setFilterPayload(payload)
    dispatch(
      getAllEvents({
        ...payload,
        pageNumber: 1,
        pageSize: 9,
      })
    )
  }

  return (
    <div className={classes.root}>
      <div>
        <TabPanel value={tabIndex} index={0}>
          <Helmet title="Search events" />

          <main className={classes.content}>
            <div ref={myRef} />
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
                  <Grid item xs={12} md={6} lg={4}>
                    <EventCard event={item} openDetails={gotoEventDetails} />
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
        </TabPanel>
      </div>
      <TabPanel value={tabIndex} index={1}>
        <EventDetailsView
          goBack={goBack}
          parentPage="Search events"
          id={eventId}
        />
      </TabPanel>
    </div>
  )
}

export default EventSearch
