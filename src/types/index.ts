import Player from "./Player"
import ArenaOwner from "./ArenaOwner"
import Event from "./Event"

export enum UserType {
  PLAYER = "player",
  ARENA = "arena",
}

type User = ArenaOwner | Player | null

export type { ArenaOwner, Event, Player, User }
