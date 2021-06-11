import React from "react"
import { Event as BigCalendarEvent } from "react-big-calendar"

export interface ICalendarEvent extends BigCalendarEvent {
  color?: React.CSSProperties["color"]
}

export interface IEvent extends ICalendarEvent {
  _id: string
}
