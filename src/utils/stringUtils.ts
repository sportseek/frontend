import { ArenaOwner, Player, User } from "types"

export const isEmpty = (obj: Object) => JSON.stringify(obj) === "{}"

export const isArenaAccount = (user: User): user is ArenaOwner =>
  (user as ArenaOwner).arenaName !== undefined

export const getUserName = (user: User) => {
  if (isEmpty(user)) return ""
  return isArenaAccount(user)
    ? (user as ArenaOwner).arenaName
    : `${(user as Player).firstName} ${(user as Player).lastName}`
}
