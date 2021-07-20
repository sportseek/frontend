import { IAddress, ICalendarEvent, ILocation } from "types"

export interface IEvent extends ICalendarEvent {
  creator: string
  location: ILocation
  description: string
  sportType: string
  entryFee: number
  minPlayers: number
  maxPlayers: number
  registeredPlayers: string[]
  interestedPlayers: string[]
  revenue: number
  address: IAddress
  status: string
  eventImageUrl: string
}

export interface CreateEventPayload {
  _id?: string
  creator: string
  description: string
  sportType: string
  entryFee: number
  minPlayers: number
  maxPlayers: number
  title: string
  start: string
  end: string
}

export interface SearchEventPayload {
  eventTitle?: string
  sportType?: string
  eventStartTime?: string
  eventEndTime?: string
  eventFee?: number[]
  location?: any
  sortBy?: string
  sortValue?: number
  pageSize?: number
  pageNumber?: number
}

export interface UpdateInterestedPayload {
  eventId: string
  interested: boolean
}

export interface UpdateRegisteredPayload {
  eventId: string
  registered: boolean
  fee: number
  withWallet: boolean
}

export interface SearchEventsByCreatorPayload {
  creator: string
  eventStartTime: string
}

export interface InviteFriendsPayload {
  friendsIds: string[]
  eventId: string
}

export interface PaymentIntentPayload {
  amount: number
}
