import React from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import PerfectScrollbar from "react-perfect-scrollbar"

import { Event } from "types"
import { ModifyEvent } from "components/EventForm"

const localizer = momentLocalizer(moment)

const myEventsList: Event[] = [
  {
    allDay: false,
    title: "Play football",
    start: moment().toDate(),
    end: moment().add(3, "hour").toDate(),
  },
]

const MyCalendar = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedEvent, setEvent] = React.useState<Event>({ title: "" })

  const openEventDetails = (event: Event) => {
    setOpen(true)
    setEvent(event)
    console.log(event)
  }

  return (
    <Card>
      <CardHeader title="Upcoming events" />
      <CardContent>
        <PerfectScrollbar>
          <Calendar
            selectable
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            style={{ height: 600 }}
            onSelectEvent={(event) => openEventDetails(event)}
          />
        </PerfectScrollbar>
      </CardContent>
      <ModifyEvent
        open={open}
        setOpen={setOpen}
        event={selectedEvent as Event}
      />
    </Card>
  )
}

export default MyCalendar
