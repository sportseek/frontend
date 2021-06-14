import { momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { ICalendarEvent, IPersonalEvent } from "types"

moment.locale("de", {
  week: {
    dow: 1,
    doy: 1,
  },
})

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
  isSmallScreen ? "agenda" : "week"

export const setEventColor = (
  idList: string[] | undefined,
  color: React.CSSProperties["color"]
) => (idList === undefined ? [] : idList.map((id) => ({ _id: id, color })))

export const convertToCalenderEvent = (
  list: IPersonalEvent[],
  color: React.CSSProperties["color"]
) =>
  list.map(({ start, end, ...data }) => ({
    start: moment(start).toDate(),
    end: moment(end).toDate(),
    ...data,
    color,
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
