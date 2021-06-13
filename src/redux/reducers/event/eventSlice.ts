import { CreateEventPayload } from "types/ArenaOwner"
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IEvent } from "types"
import eventAPI from "./eventAPI"
import { EventFullDetails } from "types/Event"

interface EventState {
  currentEvent: IEvent
  arenaEvents: EventFullDetails[],
}

const initialState: EventState = {
  currentEvent: { _id: "" },
  arenaEvents: [],
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
  async (event: IEvent) => {
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

export const getArenaEvents = createAsyncThunk(
  "events/getArenaEvents",
  async () => {
    const response = await eventAPI.getArenaEvents()
    return response.data
  }
)

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchEventById.fulfilled, updateEvent.fulfilled),
        (state, action) => {
          state.currentEvent = action.payload.event
        }
      )
      .addMatcher(
        isAnyOf(getArenaEvents.fulfilled),
        (state, action) => {
          state.arenaEvents = action.payload.arenaEvents
        }
      )
  },
})

export const selectCurrentEvent = (state: RootState) => state.event.currentEvent
export const selectArenaEvents = (state: RootState) => state.event.arenaEvents

export default eventSlice.reducer
