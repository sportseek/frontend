import { CreateEventPayload } from "types/Event"
import axios from "utils/axios"

const eventEndpoint = "event"

const fetchById = async (id: string) => {
  const url = `/${eventEndpoint}/findById/${id}`
  const response = await axios.get(url)
  return response
}

const create = async (payload: CreateEventPayload) => {
  const url = `/${eventEndpoint}/create`
  const response = await axios.post(url, payload)
  return response
}

const update = async (event: CreateEventPayload) => {
  const url = `/${eventEndpoint}/update/${event._id}`
  const response = await axios.put(url, event)
  return response
}

const cancel = async (eventId: string) => {
  const url = `/${eventEndpoint}/cancel/${eventId}`
  const response = await axios.put(url)
  return response
}

const fetchEventList = async () => {
  const url = `/${eventEndpoint}/fetchEventList`
  const response = await axios.get(url)
  return response
}

export const findSportEventById = async (id: string) => {
  const response = await fetchById(id)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}

export default {
  fetchById,
  update,
  create,
  cancel,
  fetchEventList,
  findSportEventById,
}
