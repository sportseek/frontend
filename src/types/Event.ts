import { Event as CalenderEvent } from "react-big-calendar"

export default interface Event extends CalenderEvent {
  text?: string
}
