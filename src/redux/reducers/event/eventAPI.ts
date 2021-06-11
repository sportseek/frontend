import axios from "utils/axios"
import { IEvent } from "types"

const eventEndpoint = "event"

const fetchById = async (id: string) => {
  const url = `/${eventEndpoint}/findById/${id}`
  const response = await axios.get(url)
  return response
}

const update = async (event: IEvent) => {
  const url = `/${eventEndpoint}/update/${event._id}`
  const response = await axios.put(url, event)
  return response
}

export default { fetchById, update }
