import { CreateEventPayload } from "types/ArenaOwner"
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

const getArenaEvents = async () => {
  const url = `/${eventEndpoint}/getArenaEvents`
  const response = await axios.get(url)
  return response
}

export default { fetchById, update, create, cancel, getArenaEvents }