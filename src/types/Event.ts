import React from "react"
import { Event as BigCalendarEvent } from "react-big-calendar"
import { ILocation } from "types"

export interface ICalendarEvent extends BigCalendarEvent {
  color?: React.CSSProperties["color"]
}

export interface IEvent extends ICalendarEvent {
  _id: string
  creator?: string
  location?: ILocation
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
  location: ILocation
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
