import { ICalendarEvent } from "types"


export interface IPersonalEvent extends ICalendarEvent {
    creator: string
    description?: string
}

export type PEventPayload = {
    creator: string
    description?: string
    start: string
    end: string
    title: string
    allDay?: boolean
}
