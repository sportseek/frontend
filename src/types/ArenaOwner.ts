export default interface ArenaOwner {
  arenaName: any;
  firstName?: string
  lastName?: string
  type: string
  id: string
}


export interface CreateEventPayload {
  eventTitle: string
  sportType: string
  eventDescription: string
  eventDate: string
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
  eventDate: string
  eventStartTime: string
  eventEndTime: string
  entryFee: number
  maximumParticipants: number
  minimumParticipants: number
}