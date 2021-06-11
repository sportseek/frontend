import Location from "./location"

export default interface IPlayer {
  firstName?: string
  lastName?: string
  email?: string
  mobilePhone?: string
  type: string
  _id: string
  location?: Location
  profileImageUrl?: string
  registeredEvents?: string[]
  interestedEvents?: string[]
}
