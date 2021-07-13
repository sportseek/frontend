import { IAddress, ILocation } from "types"

export default interface IArenaOwner {
  _id: string
  arenaName: string
  type: string
  email: string
  password: string
  address: IAddress
  phone: string
  location: ILocation
  monthlyFee: number
  profileImageUrl: string
  profileImageId: string
  bankAccount: string
}

export interface ArenaEvent {
  eventTitle: string
  sportType: string
  eventDescription: string
  eventStartTime: string
  eventEndTime: string
  entryFee: number
  maximumParticipants: number
  minimumParticipants: number
}
