import Location from "./location"

export default interface ArenaOwner {
  arenaName: string
  firstName?: string
  lastName?: string
  type: string
  _id: string
  location?: Location
}


export interface CreateEventPayload {
  eventTitle: string
  sportType: string
  eventDescription: string
  eventStartTime: string
  eventEndTime: string
  entryFee: number
  maximumParticipants: number
  minimumParticipants: number
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