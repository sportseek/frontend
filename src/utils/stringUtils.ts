import { IArenaOwner, IPlayer, IUser } from "types"

export const isEmpty = (obj: Object) => JSON.stringify(obj) === "{}"

export const isEmptyUser = (user: IUser) =>
  JSON.stringify(user) === "{}" || user._id === ""

export const isArenaAccount = (user: IUser): user is IArenaOwner =>
  (user as IArenaOwner).arenaName !== undefined

export const getUserName = (user: IUser) => {
  if (isEmptyUser(user)) return ""
  return isArenaAccount(user)
    ? (user as IArenaOwner).arenaName
    : `${(user as IPlayer).firstName} ${(user as IPlayer).lastName}`
}
