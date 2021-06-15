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
import { ICalendarEvent, PEventPayload, IPlayer, IPersonalEvent } from "types"
import {
  getViews,
  getView,
  localizer,
  setEventColor,
  getCalendarInfo,
  convertToCalenderEvent,
} from "utils/calendarUtils"
import { AddPersonalEventDialog, AddPersonalEventPopOver } from "components/PersonalEvent"
import CardHeader from "./CalendarCardHeader"
import SubHeader from "./CalendarCardSubHeader"

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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [pEvent, setPEvent] = useState<IPersonalEvent>({} as IPersonalEvent)

  const events = sportEvents.concat(personalEvents)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { interestedEvents = [], registeredEvents = [] } = player
  const { interestedEventColor, registeredEventColor, personalEventColor } =
    theme.calendar

  const pEColor = selectable
    ? personalEventColor.disabled
    : personalEventColor.main
  const iEColor = selectable
    ? interestedEventColor.disabled
    : interestedEventColor.main
  const rEColor = selectable
    ? registeredEventColor.disabled
    : registeredEventColor.main

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch, reload])

  useEffect(() => {
    setPEvents(convertToCalenderEvent(playerEvents, pEColor))
  }, [pEColor, playerEvents])

  const sportEventIds: ICalendarEvent[] = useMemo(
    () => [
      ...setEventColor(interestedEvents, iEColor),
      ...setEventColor(registeredEvents, rEColor),
    ],
    [interestedEvents, registeredEvents, iEColor, rEColor]
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
  const openPopup = () => setOpen(true)
  const closePopUp = () => setOpen(false)
  const makeEditable = () => {
    setSelectable(true)
    setOpen(false)
  }

  const onSelectPEvent = (
    event: ICalendarEvent,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    setPEvent(event as IPersonalEvent)
    setAnchorEl(e.currentTarget)
  }

  const goBackToNormalMode = () => setSelectable(false)

  const onSelectEvent = (
    event: ICalendarEvent,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) =>
    event.color && !selectable && event.color !== personalEventColor.main
      ? gotoEventDetails(event._id)
      : onSelectPEvent(event, e)

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

  const closePersonalEventPopover = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardHeader
        showActions={!isSmallScreen}
        openSchedule={openPopup}
        selectable={selectable}
        closeSchedule={goBackToNormalMode}
      />
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
        <AddPersonalEventDialog
          open={open}
          handleClose={closePopUp}
          handleOKClick={makeEditable}
        />
        <AddPersonalEventPopOver
          anchorEl={anchorEl}
          handleClose={closePersonalEventPopover}
          event={pEvent}
        />
      </CardContent>
    </Card>
  )
}

export default PlayerCalendar
