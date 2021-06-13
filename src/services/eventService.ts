import eventAPI from "redux/reducers/event/eventAPI"
import { IEvent } from "types"

export const findEventById = async (id: string) => {
  const response = await eventAPI
    .fetchById(id)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}

export const createEvent = async (event: any) => {
  const response = await eventAPI
    .create(event)
    .then((res) => res)
    .catch((err) => ({ data: { success: false, error: err } }))

  return response.data
}
