import { Event as CalenderEvent } from "react-big-calendar"

export default interface IEvent extends CalenderEvent {
  _id: string
  color?: React.CSSProperties["color"]
}
