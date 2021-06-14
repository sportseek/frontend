import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IEvent, CreateEventPayload } from "types"
import eventAPI from "./eventAPI"

interface EventState {
  currentEvent: IEvent
  events: IEvent[]
  reloadEvents: boolean
}

const initialState: EventState = {
  currentEvent: {} as IEvent,
  events: [],
  reloadEvents: false,
}

export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id: string) => {
    const response = await eventAPI.fetchById(id)
    return response.data
  }
)

export const updateEvent = createAsyncThunk(
  "event/update",
  async (event: CreateEventPayload) => {
    const response = await eventAPI.update(event)
    return response.data
  }
)

export const createEvent = createAsyncThunk(
  "events/create",
  async (payload: CreateEventPayload) => {
    const response = await eventAPI.create(payload)
    return response.data
  }
)

export const cancelEvent = createAsyncThunk(
  "event/cancel",
  async (eventId: string) => {
    const response = await eventAPI.cancel(eventId)
    return response.data
  }
)

export const getEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await eventAPI.fetchEventList()
  return response.data
})

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
        state.reloadEvents = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload.eventList
        state.reloadEvents = false
      })
      .addMatcher(
        isAnyOf(createEvent.fulfilled, cancelEvent.fulfilled),
        (state) => {
          state.reloadEvents = true
        }
      )
  },
})

export const selectCurrentEvent = (state: RootState) => state.event.currentEvent
export const selectEvents = (state: RootState) => state.event.events
export const selectReloadEvents = (state: RootState) => state.event.reloadEvents

export default eventSlice.reducer
