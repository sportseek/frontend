import React, { useEffect, useMemo, useState } from "react"
import { Calendar, View, ViewsProps, SlotInfo } from "react-big-calendar"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { useTheme } from "@material-ui/core/styles"
import { Card, CardContent, useMediaQuery } from "@material-ui/core"
import {
  fetchPEvents,
  selectEvents,
  selectNeedToUpdatePersonalEventList,
} from "redux/reducers/pEvent/pEventSlice"
import {
  fetchLoggedInUser,
  selectLoggedInUser,
} from "redux/reducers/user/userSlice"
import { findSportEventById } from "redux/reducers/event/eventAPI"
import { selectReloadEvents } from "redux/reducers/event/eventSlice"
import { ICalendarEvent, IPlayer, IPersonalEvent } from "types"
import {
  getViews,
  getView,
  localizer,
  changeColor,
  setEventColor,
  getCalendarInfo,
  convertToCalenderEvent,
} from "utils/calendarUtils"
import {
  PersonalEventInfoDialog,
  AddPersonalEventFormDialog,
  AddPersonalEventPopOver,
} from "components/PersonalEvent"
import { useHistory } from "react-router-dom"
import CardHeader from "./CalendarCardHeader"
import SubHeader from "./CalendarCardSubHeader"

const PlayerCalendar = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const playerEvents = useAppSelector(selectEvents)
  const isPEventsUpdated = useAppSelector(selectNeedToUpdatePersonalEventList)
  const isSEventsUpdated = useAppSelector(selectReloadEvents)
  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const [openInfoDialog, setOpenInfoDialog] = useState(false)
  const [openFormDialog, setOpenFormDialog] = useState(false)
  const [selectable, setSelectable] = useState(false)
  const [slotInfo, setSlotInfo] = useState<SlotInfo>({} as SlotInfo)
  const [view, setView] = useState<View>()
  const [views, setViews] = useState<ViewsProps>()
  const [sportEvents, setSEvents] = useState<ICalendarEvent[]>([])
  const [personalEvents, setPEvents] = useState<ICalendarEvent[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [pEvent, setPEvent] = useState<IPersonalEvent>({} as IPersonalEvent)
  const [events, setEvents] = useState<ICalendarEvent[]>([])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { interestedEvents = [], registeredEvents = [] } = player
  const { interestedEventColor, registeredEventColor, personalEventColor } =
    theme.calendar

  const history = useHistory()

  const gotoEventDetails = (id: string) => {
    const href = `/eventdetails/${id}`
    history.push(href)
  }

  useEffect(() => {
    dispatch(fetchLoggedInUser())
  }, [dispatch, isSEventsUpdated])

  useEffect(() => {
    dispatch(fetchPEvents())
  }, [dispatch, isPEventsUpdated])

  useEffect(() => {
    setPEvents(convertToCalenderEvent(playerEvents, personalEventColor))
  }, [personalEventColor, playerEvents])

  const sportEventIds: ICalendarEvent[] = useMemo(
    () => [
      ...setEventColor(
        interestedEvents.filter((item) => registeredEvents.indexOf(item) < 0),
        interestedEventColor
      ),
      ...setEventColor(registeredEvents, registeredEventColor),
    ],
    [
      interestedEventColor,
      interestedEvents,
      registeredEventColor,
      registeredEvents,
    ]
  )

  useEffect(() => {
    let running = true

    const fetchEventList = async (ids: ICalendarEvent[]) => {
      const promises = ids.map(({ _id }) => findSportEventById(_id))
      const result = await Promise.all(promises)
      const res = getCalendarInfo(ids, result)
      if (running) setSEvents(res)
    }
    if (sportEventIds.length > 0) fetchEventList(sportEventIds)

    return () => {
      running = false
    }
  }, [sportEventIds])

  useEffect(() => {
    setViews(getViews(isSmallScreen))
    setView(getView(isSmallScreen))
  }, [isSmallScreen])

  useEffect(() => {
    let e = sportEvents.concat(personalEvents)
    e = changeColor(e, selectable)
    setEvents(e)
  }, [personalEvents, sportEvents, selectable])

  const handleViewChange = (v: View) => setView(v)
  const openInfoPopUp = () => setOpenInfoDialog(true)
  const closeInfoPopUp = () => setOpenInfoDialog(false)
  const openFormPopUp = () => setOpenFormDialog(true)
  const closeFormPopUp = () => setOpenFormDialog(false)
  const makeEditable = () => {
    setSelectable(true)
    closeInfoPopUp()
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
  ) => {
    if (!selectable) {
      if (
        event.bgcolor === personalEventColor.main ||
        event.bgcolor === personalEventColor.disabled
      )
        onSelectPEvent(event, e)
      else gotoEventDetails(event._id)
    }
  }
  const onSelectSlot = (si: SlotInfo) => {
    setSlotInfo(si)
    openFormPopUp()
  }

  const closePersonalEventPopover = () => {
    setAnchorEl(null)
  }

  return (
    <Card raised>
      <CardHeader
        showActions={!isSmallScreen}
        openSchedule={openInfoPopUp}
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
              backgroundColor: event.bgcolor,
            },
          })}
        />
        <PersonalEventInfoDialog
          open={openInfoDialog}
          handleClose={closeInfoPopUp}
          handleOKClick={makeEditable}
        />
        <AddPersonalEventFormDialog
          open={openFormDialog}
          slotInfo={slotInfo}
          handleClose={closeFormPopUp}
          goBack={goBackToNormalMode}
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
