import { Event as CalenderEvent } from "react-big-calendar"

export default interface Event extends CalenderEvent {
  _id: string
  color?: React.CSSProperties["color"]
}
