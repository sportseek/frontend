import { Event as BigCalendarEvent } from "react-big-calendar"

export default interface ICalendarEvent extends BigCalendarEvent {
  _id: string
  color?: React.CSSProperties["color"]
}
