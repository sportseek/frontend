import { IAddress, ILocation } from "types"

export default interface IPlayer {
  _id: string
  firstName: string
  lastName: string
  email: string
  type: string
  location: ILocation
  password: string
  address: IAddress
  phone: string
  wallet: number
  profileImageUrl: string
  registeredEvents: string[]
  interestedEvents: string[]
}

export type PlayerPayload = {
  firstName: string
  lastName: string
  email: string
  address: IAddress
  phone: string
}