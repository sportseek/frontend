import moment from "moment"
import { IAddress, IArenaOwner, IPlayer, IUser } from "types"

export const isEmpty = (obj: Object) =>
  obj === null || obj === undefined || JSON.stringify(obj) === "{}"

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

export const getFormattedAddress = (address: IAddress) =>
  isEmpty(address) || address.street === ""
    ? ""
    : `${address.street}, ${address.postcode}, ${address.city}, ${address.country}`

export const getReadableDate = (date: Date | undefined) =>
  date === undefined ? "" : moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
