import Location from "./location"

export default interface ArenaOwner {
  arenaName: string
  firstName?: string
  lastName?: string
  type: string
  _id: string
  location?: Location
}
