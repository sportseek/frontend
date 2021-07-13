import { PEventPayload } from "types"
import { SearchPEventPayload } from "types/PersonalEvent"
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

const deleteEvent = async (id: string) => {
  const url = `/${eventEndpoint}/${id}`
  const response = await axios.delete(url)
  return response
}

const fetchAllPEvents = async (searchPayload: SearchPEventPayload) => {
  const url = `/${eventEndpoint}/fetchAllPEvents`
  const response = await axios.post(url, searchPayload)
  return response
}

export default { create, deleteEvent, fetchEventList, fetchAllPEvents }
