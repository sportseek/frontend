import { ICalendarEvent } from "types"

export interface IPersonalEvent extends ICalendarEvent {
  creator: string
  description?: string
}

export type PEventPayload = {
  description: string
  start: string
  end: string
  title: string
}

export interface SearchPEventPayload {
  eventStartTime?: string
  eventEndTime?: string
}
