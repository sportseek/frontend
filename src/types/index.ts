import IPlayer from "./Player"
import IArenaOwner from "./ArenaOwner"
import { IEvent, CreateEventPayload } from "./Event"
import ILocation from "./location"
import IAddress from "./Address"
import ICalendarEvent from "./CalendarEvent"
import { IPersonalEvent, PEventPayload } from "./pEvent"

export enum UserType {
  PLAYER = "player",
  ARENA = "arena",
}

type IUser = IArenaOwner | IPlayer

export type {
  CreateEventPayload,
  IAddress,
  IArenaOwner,
  IEvent,
  ICalendarEvent,
  IPlayer,
  IPersonalEvent,
  IUser,
  ILocation,
  PEventPayload
}
