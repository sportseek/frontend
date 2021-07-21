import Geocode from "react-geocode"
import { IAddress, ILocation } from "types"

Geocode.setApiKey(process.env.GEOCODE_API as string)
Geocode.setLanguage("en")

const getLatLngFromAddress = async (address: string) => {
  const location = await Geocode.fromAddress(address)
    .then((response) => response.results[0].geometry.location)
    .catch((error) => {
      console.error(error)
      return null
    })

  return location
}

const generateAddressFromLocation = async (location: ILocation) => {
  const lat = String(location.lat)
  const lng = String(location.lng)

  const address = await Geocode.fromLatLng(lat, lng)
    .then((res) => res.results[0].formatted_address as string)
    .catch((error) => {
      console.log(error)
      return ""
    })
  return address
}

const getAddress = async (location: ILocation) => {
  const lat = String(location.lat)
  const lng = String(location.lng)
  const fetchAddress = await Geocode.fromLatLng(lat, lng)
    .then((res) => res.results[0].formatted_address)
    .catch((error) => {
      console.log(error)
      return ""
    })

  const newAddress = {} as IAddress

  const comps = fetchAddress.split(",")

  comps.forEach((elem: string, index: number) => {
    if (index === 0) newAddress.street = elem.trim()
    if (index === 1) {
      const [post = "", city = ""] = elem.trim().split(" ")
      newAddress.postcode = post
      newAddress.city = city
    }
    if (index === 2) newAddress.country = elem.trim()
  })

  return newAddress
}

export { getAddress, generateAddressFromLocation, getLatLngFromAddress }

export default Geocode
