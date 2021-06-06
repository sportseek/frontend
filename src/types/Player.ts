import Location from "./location"

export default interface Player {
  firstName?: string
  lastName?: string
  email?: string
  mobilePhone?: string
  type: string
  _id: string
  location? : Location
}
