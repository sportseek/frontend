import { momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { ICalendarEvent, IPersonalEvent } from "types"
import { CalendarEventColor } from "theme/types"

moment.locale("de", {
  week: {
    dow: 1,
    doy: 1,
  },
})

const now = moment()

export const localizer = momentLocalizer(moment)

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
  isSmallScreen ? "agenda" : "month"

export const setEventColor = (
  idList: string[] | undefined,
  color: CalendarEventColor
) =>
  idList === undefined
    ? []
    : idList.map((id) => ({ _id: id, color, bgcolor: color.main }))

const getBGColor = (
  end: Date | undefined,
  color: CalendarEventColor | undefined
) => (end && moment(end).isBefore(now) ? color?.disabled : color?.main)

export const convertToCalenderEvent = (
  list: IPersonalEvent[],
  color: CalendarEventColor
) =>
  list.map(({ start, end, ...data }) => ({
    start: moment(start).toDate(),
    end: moment(end).toDate(),
    ...data,
    color,
    bgcolor: color.main,
  }))

export const getCalendarInfo = (
  details: ICalendarEvent[],
  responses: any[]
): ICalendarEvent[] =>
  responses
    .filter(({ success }) => success)
    .map(({ event: { start, end, title } }, index) => ({
      start: moment(start).toDate(),
      end: moment(end).toDate(),
      title,
      ...details[index],
    }))

export const changeColor = (events: ICalendarEvent[], disabled: boolean) =>
  events.map((event) => ({
    ...event,
    bgcolor: disabled
      ? event.color?.disabled
      : getBGColor(event.end, event.color),
  }))
