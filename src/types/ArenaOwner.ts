import Location from "./location"

export default interface IArenaOwner {
  arenaName: string
  firstName?: string
  lastName?: string
  type: string
  _id: string
  location?: Location
  profileImageUrl?: string
}
