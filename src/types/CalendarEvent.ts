import { Event as BigCalendarEvent } from "react-big-calendar"
import { CalendarEventColor } from "theme/types"

export default interface ICalendarEvent extends BigCalendarEvent {
  _id: string
  color?: CalendarEventColor
  bgcolor?: React.CSSProperties["color"]
}
