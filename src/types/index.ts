import IPlayer from "./Player"
import IArenaOwner from "./ArenaOwner"
import { IEvent, ICalendarEvent } from "./Event"
import ILocation from "./location"
import IAddress from "./Address"

export enum UserType {
  PLAYER = "player",
  ARENA = "arena",
}

type IUser =
  | IArenaOwner
  | IPlayer
  | { _id: string; location: ILocation; profileImageUrl: "" }

export type {
  IAddress,
  IArenaOwner,
  IEvent,
  ICalendarEvent,
  IPlayer,
  IUser,
  ILocation,
}
