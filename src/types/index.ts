import Player from "./Player"
import ArenaOwner from "./ArenaOwner"
import Event from "./Event"
import Location from "./location"

export enum UserType {
  PLAYER = "player",
  ARENA = "arena",
}

type User = ArenaOwner | Player | { _id: string; location: Location }

export type { ArenaOwner, Event, Player, User, Location }
