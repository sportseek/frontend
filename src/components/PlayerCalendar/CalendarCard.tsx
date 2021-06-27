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
  setEventColor,
  getCalendarInfo,
  convertToCalenderEvent,
} from "utils/calendarUtils"
import {
  PersonalEventInfoDialog,
  AddPersonalEventFormDialog,
  AddPersonalEventPopOver,
} from "components/PersonalEvent"
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
    dispatch(fetchLoggedInUser())
  }, [dispatch, isSEventsUpdated])

  useEffect(() => {
    dispatch(fetchPEvents())
  }, [dispatch, isPEventsUpdated])

  useEffect(() => {
    setPEvents(convertToCalenderEvent(playerEvents, pEColor))
  }, [pEColor, playerEvents])

  const sportEventIds: ICalendarEvent[] = useMemo(
    () => [
      ...setEventColor(
        interestedEvents.filter((item) => registeredEvents.indexOf(item) < 0),
        iEColor
      ),
      ...setEventColor(registeredEvents, rEColor),
    ],
    [interestedEvents, registeredEvents, iEColor, rEColor]
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
  ) =>
    event.color && !selectable && event.color !== personalEventColor.main
      ? gotoEventDetails(event._id)
      : onSelectPEvent(event, e)

  const onSelectSlot = (si: SlotInfo) => {
    setSlotInfo(si)
    openFormPopUp()
  }

  const closePersonalEventPopover = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
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
              backgroundColor: event.color,
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
          userId={player._id}
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
