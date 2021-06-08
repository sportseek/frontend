import React, { useEffect, useMemo, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import { useAppSelector } from "redux/hooks"
import { useTheme } from "@material-ui/core/styles"
import moment from "moment"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  selectRegtedEventIds,
  selectInstedEventIds,
} from "redux/reducers/user/userSlice"
import { Event } from "types"
import { ModifyEvent } from "components/EventForm"
import { findEventById, getEventDetails } from "services/eventService"

const localizer = momentLocalizer(moment)

const placeholderEvents: Event[] = [
  {
    _id: "123",
    allDay: false,
    title: "Play football",
    start: moment().toDate(),
    end: moment().add(3, "hour").toDate(),
  },
]

const PlayerCalendar = () => {
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<Event>()
  const [events, setEvents] = useState<Event[]>(placeholderEvents)

  const interestedEventIds = useAppSelector(selectInstedEventIds)
  const registeredEventIds = useAppSelector(selectRegtedEventIds)

  const eventDetails: Event[] = useMemo(() => {
    const { interestedEventColor, registeredEventColor } = theme.calendar
    return [
      ...getEventDetails(interestedEventIds, interestedEventColor),
      ...getEventDetails(registeredEventIds, registeredEventColor),
    ]
  }, [interestedEventIds, registeredEventIds, theme.calendar])

  useEffect(() => {
    const fetch = async (details: Event[]) => {
      const promises = []

      for (let i = 0; i < details.length; i += 1) {
        promises.push(findEventById(details[i]._id))
      }

      const result = await Promise.all(promises)
      const res = []

      for (let i = 0; i < result.length; i += 1) {
        const { success, event } = result[i]
        if (success) {
          const { allDay, start, end, title } = event
          res.push({
            allDay,
            start: moment(start).toDate(),
            end: moment(end).toDate(),
            title,
            ...details[i],
          })
        }
      }

      setEvents(res)
    }

    fetch(eventDetails)
  }, [eventDetails])

  const openEventDetails = (event: Event) => {
    setOpen(true)
    setSelectedEvent(event)
  }

  return (
    <Card>
      <CardHeader title="Upcoming events" />
      <CardContent>
        <PerfectScrollbar>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            style={{ height: 600 }}
            onSelectEvent={(event) => openEventDetails(event)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
              },
            })}
          />
        </PerfectScrollbar>
      </CardContent>
      {open && (
        <ModifyEvent
          open={open}
          setOpen={setOpen}
          event={selectedEvent as Event}
        />
      )}
    </Card>
  )
}

export default PlayerCalendar
