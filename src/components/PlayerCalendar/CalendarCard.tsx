import React, { useEffect, useMemo, useState } from "react"
import { Calendar, View, ViewsProps, SlotInfo } from "react-big-calendar"
import { useAppSelector } from "redux/hooks"
import { useTheme } from "@material-ui/core/styles"
import { Card, CardContent, useMediaQuery } from "@material-ui/core"
import {
  selectUser,
  selectRegtedEventIds,
  selectInstedEventIds,
} from "redux/reducers/user/userSlice"
import moment from "moment"
import { IEvent } from "types"
import { createEvent, findEventById } from "services/eventService"
import CardHeader from "./CardHeader"
import SubHeader from "./CardSubHeader"
import AddEventPopUp from "./AddEvent"
import {
  getCalendarEvents,
  getViews,
  getView,
  localizer,
  getEventDetails,
} from "./CalendarUtils"

type CalendarProps = {
  goto: (id: string) => void
}

const PlayerCalendar = (props: CalendarProps) => {
  const theme = useTheme()
  const { goto: gotoEventDetails } = props

  const [open, setOpen] = useState(false)
  const [selectable, setSelectable] = useState(false)
  const [view, setView] = useState<View>()
  const [views, setViews] = useState<ViewsProps>()
  const [events, setEvents] = useState<IEvent[]>([])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handlePopup = () => setOpen(!open)

  const user = useAppSelector(selectUser)
  const interestedEventIds = useAppSelector(selectInstedEventIds)
  const registeredEventIds = useAppSelector(selectRegtedEventIds)

  const eventDetails: IEvent[] = useMemo(
    () =>
      getEventDetails(
        interestedEventIds,
        registeredEventIds,
        theme.calendar.interestedEventColor,
        theme.calendar.registeredEventColor
      ),
    [interestedEventIds, registeredEventIds, theme.calendar]
  )

  useEffect(() => {
    let running = true

    const fetchEvents = async (details: IEvent[]) => {
      const promises = details.map(({ _id }) => findEventById(_id))
      const result = await Promise.all(promises)
      const res = getCalendarEvents(details, result)
      if (running) setEvents(res)
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
      console.log(start)
      console.log(end)
      const event = {
        creator: user._id,
        location: user.location,
        start : moment(start).toDate(),
        end : moment(end).toDate(),
        title,
      }

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
