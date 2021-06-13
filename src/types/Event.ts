import React from "react"
import { Event as BigCalendarEvent } from "react-big-calendar"
import { IAddress, ILocation } from "types"

export interface ICalendarEvent extends BigCalendarEvent {
  _id: string
  color?: React.CSSProperties["color"]
}

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
}
