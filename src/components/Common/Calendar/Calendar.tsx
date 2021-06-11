import React, { FC } from "react"
import moment from "moment"
import {
  Calendar as BigCalendar,
  CalendarProps as BigCalendarProps,
  Culture,
  DateRange,
  DateLocalizer,
  momentLocalizer,
  View,
  ViewsProps,
  SlotInfo,
  Formats,
} from "react-big-calendar"
import { ICalendarEvent } from "types"

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

moment.locale("de", {
  week: {
    dow: 1,
    doy: 1,
  },
})

export const localizer = momentLocalizer(moment)

const Calendar: FC<BigCalendarProps> = (props: BigCalendarProps) => (
  <BigCalendar
    startAccessor="start"
    endAccessor="end"
    style={{ height: 600 }}
    eventPropGetter={(event: ICalendarEvent) => ({
      style: {
        backgroundColor: event.color,
      },
    })}
    {...props}
  />
)

export default Calendar
