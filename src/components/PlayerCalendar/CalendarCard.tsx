import React, { useEffect, useMemo, useState } from "react"
import { Calendar, View, ViewsProps, SlotInfo } from "react-big-calendar"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { useTheme } from "@material-ui/core/styles"
import { Card, CardContent, useMediaQuery } from "@material-ui/core"
import moment from "moment"
import {
  createEvent,
  getEvents,
  selectEvents,
  selectNeedToUpdate,
} from "redux/reducers/pEvent/pEventSlice"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { findSportEventById } from "redux/reducers/event/eventAPI"
import { ICalendarEvent, PEventPayload, IPlayer } from "types"
import {
  getViews,
  getView,
  localizer,
  setEventColor,
  getCalendarInfo,
  convertToCalenderEvent,
} from "utils/calendarUtils"
import CardHeader from "./CardHeader"
import SubHeader from "./CardSubHeader"
import AddEventPopUp from "./AddEvent"

type PlayerCalendarProps = {
  goto: (id: string) => void
}

const PlayerCalendar = (props: PlayerCalendarProps) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { goto: gotoEventDetails } = props

  const playerEvents = useAppSelector(selectEvents)
  const reload = useAppSelector(selectNeedToUpdate)
  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const [open, setOpen] = useState(false)
  const [selectable, setSelectable] = useState(false)
  const [view, setView] = useState<View>()
  const [views, setViews] = useState<ViewsProps>()
  const [sportEvents, setSEvents] = useState<ICalendarEvent[]>([])
  const [personalEvents, setPEvents] = useState<ICalendarEvent[]>([])

  const events = sportEvents.concat(personalEvents)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { interestedEvents = [], registeredEvents = [] } = player
  const { interestedEventColor, registeredEventColor, personalEventColor } =
    theme.calendar

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch, reload])

  useEffect(() => {
    setPEvents(convertToCalenderEvent(playerEvents, personalEventColor))
  }, [personalEventColor, playerEvents])

  const sportEventIds: ICalendarEvent[] = useMemo(
    () => [
      ...setEventColor(interestedEvents, interestedEventColor),
      ...setEventColor(registeredEvents, registeredEventColor),
    ],
    [
      interestedEvents,
      registeredEvents,
      interestedEventColor,
      registeredEventColor,
    ]
  )

  useEffect(() => {
    let running = true

    const fetchEvents = async (ids: ICalendarEvent[]) => {
      const promises = ids.map(({ _id }) => findSportEventById(_id))
      const result = await Promise.all(promises)
      const res = getCalendarInfo(ids, result)
      if (running) setSEvents(res)
    }

    fetchEvents(sportEventIds)

    return () => {
      running = false
    }
  }, [sportEventIds])

  useEffect(() => {
    setViews(getViews(isSmallScreen))
    setView(getView(isSmallScreen))
  }, [isSmallScreen])

  const handleViewChange = (v: View) => setView(v)
  const handlePopup = () => setOpen(!open)

  const onSelectEvent = (event: ICalendarEvent) =>
    event.color &&
    event.color !== personalEventColor &&
    gotoEventDetails(event._id)

  const onSelectSlot = ({ start, end }: SlotInfo) => {
    const title = window.prompt("New Event name")
    if (title) {
      const event: PEventPayload = {
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
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
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
