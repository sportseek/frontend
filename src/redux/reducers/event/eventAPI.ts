import {
  CreateEventPayload,
  SearchEventPayload,
  UpdateInterestedPayload,
  UpdateRegisteredPayload,
  SearchEventsByCreatorPayload,
  InviteFriendsPayload,
  PaymentIntentPayload,
} from "types/Event"
import axios from "utils/axios"

const eventEndpoint = "event"

const fetchById = async (id: string) => {
  const url = `/${eventEndpoint}/findById/${id}`
  const response = await axios.get(url)
  return response
}

const create = async (payload: any) => {
  const url = `/${eventEndpoint}/create`
  const response = await axios.post(url, payload)
  return response
}

const update = async (event: any, eventId: string) => {
  const url = `/${eventEndpoint}/update/${eventId}`
  const response = await axios.put(url, event)
  return response
}

const cancel = async (eventId: string) => {
  const url = `/${eventEndpoint}/cancel/${eventId}`
  const response = await axios.put(url)
  return response
}

const fetchEventList = async (payload: SearchEventPayload) => {
  const url = `/${eventEndpoint}/fetchEventList`
  const response = await axios.post(url, payload)
  return response
}

const fetchAllEventList = async (searchPayload: SearchEventPayload) => {
  const url = `/${eventEndpoint}/fetchAllEvents`
  const response = await axios.post(url, searchPayload)
  return response
}

const updateInterested = async (interestedPayload: UpdateInterestedPayload) => {
  const url = `/${eventEndpoint}/updateInterested/${interestedPayload.eventId}`
  const response = await axios.put(url, {
    interested: interestedPayload.interested,
  })
  return response
}

const updateRegistered = async (registeredPayload: UpdateRegisteredPayload) => {
  const url = `/${eventEndpoint}/updateRegistered/${registeredPayload.eventId}`
  const response = await axios.put(url, registeredPayload)
  return response
}

export const findSportEventById = async (id: string) => {
  const response = await fetchById(id)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}

const getMinMaxPrice = async () => {
  const url = `/${eventEndpoint}/getMinMaxPrice`
  const response = await axios.get(url)
  return response
}

const fetchAllEventsByCreator = async (
  searchPayload: SearchEventsByCreatorPayload
) => {
  const url = `/${eventEndpoint}/fetchAllEventsByCreator`
  const response = await axios.post(url, searchPayload)
  return response
}

const getMinMaxDate = async () => {
  const url = `/${eventEndpoint}/getMinMaxDate`
  const response = await axios.get(url)
  return response
}

const inviteFriends = async (payload: InviteFriendsPayload) => {
  const url = `/${eventEndpoint}/inviteFriends`
  const response = await axios.post(url, payload)
  return response
}

const createPaymentIntent = async (payload: PaymentIntentPayload) => {
  const url = `/${eventEndpoint}/createPaymentIntent`
  const response = await axios.post(url, payload)
  return response
}

const regConflict = async (eventId: string) => {
  const url = `/${eventEndpoint}/regConflict/${eventId}`
  const response = await axios.post(url)
  return response
}

export default {
  fetchById,
  update,
  create,
  cancel,
  fetchEventList,
  fetchAllEventList,
  updateInterested,
  updateRegistered,
  findSportEventById,
  getMinMaxPrice,
  fetchAllEventsByCreator,
  getMinMaxDate,
  inviteFriends,
  createPaymentIntent,
  regConflict,
}
