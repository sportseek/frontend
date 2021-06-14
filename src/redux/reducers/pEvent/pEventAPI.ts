import { PEventPayload } from "types"
import axios from "utils/axios"

const eventEndpoint = "personalevent"

const create = async (payload: PEventPayload) => {
  const url = `/${eventEndpoint}/create`
  const response = await axios.post(url, payload)
  return response
}

const fetchEventList = async () => {
  const url = `/${eventEndpoint}/fetchEventList`
  const response = await axios.get(url)
  return response
}

export default { create, fetchEventList }
