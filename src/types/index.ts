import IPlayer from "./Player"
import IArenaOwner from "./ArenaOwner"
import IEvent from "./Event"
import ILocation from "./location"

export enum UserType {
  PLAYER = "player",
  ARENA = "arena",
}

type IUser =
  | IArenaOwner
  | IPlayer
  | { _id: string; location: ILocation; profileImageUrl: "" }

export type { IArenaOwner, IEvent, IPlayer, IUser, ILocation }
