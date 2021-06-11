import React, { useEffect, useMemo, useState } from "react"
import {
  Calendar,
  Culture,
  DateRange,
  DateLocalizer,
  momentLocalizer,
  View,
  ViewsProps,
  SlotInfo,
  Formats,
} from "react-big-calendar"
import { useAppSelector, useAppDispatch } from "redux/hooks"
import { styled, useTheme } from "@material-ui/core/styles"
import moment from "moment"
import {
  Card,
  CardHeader as MuiCardHeader,
  CardContent,
  Chip,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  selectRegtedEventIds,
  selectInstedEventIds,
} from "redux/reducers/user/userSlice"
import { fetchEventById } from "redux/reducers/event/eventSlice"

import { IEvent } from "types"
import Tooltip from "components/Common/Tooltip"
import { findEventById, getEventDetails } from "services/eventService"
import { ScheduleOutlined } from "@material-ui/icons"

import AddEventPopUp from "./AddEvent"

const InterestedChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.interestedEventColor,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const CardHeader = styled(MuiCardHeader)({
  paddingBottom: 0,
})

const RegisteredChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.registeredEventColor,
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const SubHeader = styled("div")({
  display: "flex",
  flex: 1,
  margin: "auto",
  alignItems: "center",
  justifyContent: "flex-end",
})

moment.locale("de", {
  week: {
    dow: 1,
    doy: 1,
  },
})

const localizer = momentLocalizer(moment)

const placeholderEvents: IEvent[] = [
  {
    _id: "123",
    allDay: false,
    title: "Play football",
    start: moment().toDate(),
    end: moment().add(3, "hour").toDate(),
  },
]

const fullScreenViews = {
  day: true,
  week: true,
  month: true,
}

const smallScreenViews = {
  agenda: true,
  day: true,
}

const formats: Formats = {
  agendaHeaderFormat: (
    range: DateRange,
    culture?: Culture,
    datelocalizer?: DateLocalizer
  ) =>
    datelocalizer && culture
      ? `${datelocalizer.format(
          range.start,
          "MMM Do YY",
          culture
        )} - ${datelocalizer.format(range.end, "MMM Do YY", culture)}`
      : "",
}

type CalendarProps = {
  goto: () => void
}

const PlayerCalendar = (props: CalendarProps) => {
  const { goto: gotoEventDetails } = props
  const theme = useTheme()
  const [ open, setOpen ] = useState(false)
  const [selectable, setSelectable ] = useState(false)
  const [view, setView] = useState<View>("week")
  const [views, setViews] = useState<ViewsProps>()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const dispatch = useAppDispatch()
  const [events, setEvents] = useState<IEvent[]>(placeholderEvents)

  const handlePopup = () => setOpen(!open) 

  const interestedEventIds = useAppSelector(selectInstedEventIds)
  const registeredEventIds = useAppSelector(selectRegtedEventIds)

  const eventDetails: IEvent[] = useMemo(() => {
    const { interestedEventColor, registeredEventColor } = theme.calendar
    return [
      ...getEventDetails(interestedEventIds, interestedEventColor),
      ...getEventDetails(registeredEventIds, registeredEventColor),
    ]
  }, [interestedEventIds, registeredEventIds, theme.calendar])

  useEffect(() => {
    let running = true

    const fetch = async (details: IEvent[]) => {
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

      if (running) setEvents(res)
    }

    fetch(eventDetails)

    return () => {
      running = false
    }
  }, [eventDetails])

  useEffect(() => {
    if (isSmallScreen) {
      setViews(smallScreenViews)
      setView("agenda")
    } else {
      setViews(fullScreenViews)
      setView("week")
    }
  }, [isSmallScreen])

  const handleViewChange = (v: View) => setView(v)

  const openEventDetails = (event: IEvent) => {
    dispatch(fetchEventById(event._id))
    gotoEventDetails()
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSelect = ({start, end }: SlotInfo) => {
  
    const title = window.prompt('New Event name')
    if (title)
      {
       console.log(start)
       console.log(end)
      }
  }

  return (
    <Card>
      <CardHeader
        title="Upcoming events"
        action={
          !isSmallScreen && (
            <Tooltip title="Manage Schedule" placement="left">
              <IconButton color="secondary" aria-label="manage Schedule" onClick={handlePopup}>
                <ScheduleOutlined />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardContent>
        <SubHeader>
          <InterestedChip variant="outlined" size="small" label="Interested" />
          <RegisteredChip variant="outlined" size="small" label="Registered" />
        </SubHeader>
        <PerfectScrollbar>
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
            onSelectEvent={(event) => openEventDetails(event)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
              },
            })}
          />
        </PerfectScrollbar>
        <AddEventPopUp open={open} setOpen={setOpen} setSelectable={setSelectable}/>
      </CardContent>
    </Card>
  )
}

export default PlayerCalendar
