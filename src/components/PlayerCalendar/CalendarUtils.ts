import { momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { ICalendarEvent, CreateEventPayload, IEvent } from "types"

export const extraPayload: CreateEventPayload = {
  creator: "",
  description: " ",
  sportType: " ",
  entryFee: 0,
  minPlayers: 0,
  maxPlayers: 0,
  title: "",
  start: "",
  end: "",
}

export const placeholderEvents: ICalendarEvent[] = [
  {
    _id: "123",
    allDay: false,
    title: "Play football",
    start: moment().toDate(),
    end: moment().add(3, "hour").toDate(),
  },
]

export const fullScreenViews = {
  day: true,
  week: true,
  month: true,
}

export const smallScreenViews = {
  agenda: true,
  day: true,
}

export const getViews = (isSmallScreen: boolean) =>
  isSmallScreen ? smallScreenViews : fullScreenViews

export const getView = (isSmallScreen: boolean) =>
  isSmallScreen ? "agenda" : "week"

const getEventDetailsWithColor = (
  idList: string[] | undefined,
  color: React.CSSProperties["color"]
) => {
  if (idList === undefined) return []

  return idList.map((id) => ({ _id: id, color }))
}

export const convertToCalenderEvent = ({
  _id,
  allDay,
  title,
  start,
  end,
}: IEvent) => ({
  _id,
  allDay,
  start: moment(start).toDate(),
  end: moment(end).toDate(),
  title,
})

export const getEventDetails = (
  list1: string[] | undefined,
  list2: string[] | undefined,
  color1: React.CSSProperties["color"],
  color2: React.CSSProperties["color"]
): ICalendarEvent[] => [
  ...getEventDetailsWithColor(list1, color1),
  ...getEventDetailsWithColor(list2, color2),
]

export const getCalendarEvents = (
  colors: ICalendarEvent[],
  database: any[]
): ICalendarEvent[] => {
  const events = []

  for (let i = 0; i < database.length; i += 1) {
    const { success, event } = database[i]
    if (success) {
      const { allDay, start, end, title } = event

      events.push({
        allDay,
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        title,
        ...colors[i],
      })
    }
  }

  return events
}

moment.locale("de", {
  week: {
    dow: 1,
    doy: 1,
  },
})

export const localizer = momentLocalizer(moment)
