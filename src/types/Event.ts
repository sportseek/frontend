import { Event as CalenderEvent } from "react-big-calendar"

export default interface IEvent extends CalenderEvent {
  _id: string
  color?: React.CSSProperties["color"]
}

export interface Location {
  lat: Number
  lng: Number
}

export interface Address {
  careof: string
  street: string
  postcode: number
  district: string
  city: string
  state: string
  country: string
}
export interface EventFullDetails {
  _id: string
  creator: string
  location: Location
  description: string
  sportType: string
  entryFee: number
  minPlayers: number
  maxPlayers: number
  registeredPlayers: string[]
  interestedPlayers: string[]
  revenue: number
  address: Address
  allDay: Boolean
  title: string
  start: string
  end: string
  status: string
}
