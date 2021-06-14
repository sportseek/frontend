import IPlayer from "./Player"
import IArenaOwner from "./ArenaOwner"
import { IEvent, ICalendarEvent, CreateEventPayload } from "./Event"
import ILocation from "./location"
import IAddress from "./Address"

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
  IUser,
  ILocation,
}
