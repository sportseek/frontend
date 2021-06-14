import React, { useEffect, useMemo, useState } from "react"
import { Calendar, View, ViewsProps, SlotInfo } from "react-big-calendar"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { useTheme } from "@material-ui/core/styles"
import { Card, CardContent, useMediaQuery } from "@material-ui/core"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import {
  createEvent,
  getEvents,
  selectEvents,
  selectReloadEvents
} from "redux/reducers/event/eventSlice"
import moment from "moment"
import { ICalendarEvent, CreateEventPayload, IPlayer } from "types"
import { findEventById } from "services/eventService"
import CardHeader from "./CardHeader"
import SubHeader from "./CardSubHeader"
import AddEventPopUp from "./AddEvent"
import {
  convertToCalenderEvent,
  getCalendarEvents,
  getViews,
  getView,
  localizer,
  getEventDetails,
  extraPayload,
} from "./CalendarUtils"

type CalendarProps = {
  goto: (id: string) => void
}

const PlayerCalendar = (props: CalendarProps) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { goto: gotoEventDetails } = props

  const playerEvents = useAppSelector(selectEvents)
  const reload = useAppSelector(selectReloadEvents)

  const [open, setOpen] = useState(false)
  const [selectable, setSelectable] = useState(false)
  const [view, setView] = useState<View>()
  const [views, setViews] = useState<ViewsProps>()
  const [events, setEvents] = useState<ICalendarEvent[]>([])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handlePopup = () => setOpen(!open)

  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const { interestedEvents = [], registeredEvents = [] } = player

  const eventDetails: ICalendarEvent[] = useMemo(
    () =>
      getEventDetails(
        interestedEvents,
        registeredEvents,
        theme.calendar.interestedEventColor,
        theme.calendar.registeredEventColor
      ),
    [
      interestedEvents,
      registeredEvents,
      theme.calendar.interestedEventColor,
      theme.calendar.registeredEventColor,
    ]
  )

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch, reload])

  useEffect(() => {
    const tmpList = playerEvents.map((ev) => ({
      ...convertToCalenderEvent(ev),
      color: theme.calendar.busyEventColor,
    }))
    setEvents((prev) => [...prev, ...tmpList])
  }, [playerEvents, theme.calendar.busyEventColor])

  useEffect(() => {
    let running = true

    const fetchEvents = async (details: ICalendarEvent[]) => {
      const promises = details.map(({ _id }) => findEventById(_id))
      const result = await Promise.all(promises)
      const res = getCalendarEvents(details, result)
      if (running) setEvents(prev => [...res, ...prev])
    }

    fetchEvents(eventDetails)
    return () => {
      running = false
    }
  }, [eventDetails])

  useEffect(() => {
    setViews(getViews(isSmallScreen))
    setView(getView(isSmallScreen))
  }, [isSmallScreen])

  const handleViewChange = (v: View) => setView(v)

  const handleSelect = ({ start, end }: SlotInfo) => {
    const title = window.prompt("New Event name")
    if (title) {
      const event: CreateEventPayload = {
        ...extraPayload,
        creator: player._id,
        start: moment(start).toISOString(),
        end: moment(end).toISOString(),
        title,
      }
      dispatch(createEvent(event))
    }
  }

  return (
    <Card>
      <CardHeader show={!isSmallScreen} openSchedule={handlePopup} />
      <CardContent>
        <SubHeader />
        <Calendar
          selectable={selectable}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          views={views}
          onView={handleViewChange}
          style={{ height: 600 }}
          onSelectSlot={handleSelect}
          onSelectEvent={(event) => gotoEventDetails(event._id)}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
        <AddEventPopUp
          open={open}
          setOpen={setOpen}
          setSelectable={setSelectable}
        />
      </CardContent>
    </Card>
  )
}

export default PlayerCalendar
