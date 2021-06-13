import Location from "./location"

export default interface IArenaOwner {
  arenaName: string
  email: string
  phone: string
  firstName?: string
  lastName?: string
  type: string
  _id: string
  location?: Location
  profileImageUrl?: string
}

export interface CreateEventPayload {
  _id?: string
  creator: string
  description: string
  sportType: string
  entryFee: number
  minPlayers: number
  maxPlayers: number
  allDay: Boolean
  title: string
  start: string
  end: string
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
