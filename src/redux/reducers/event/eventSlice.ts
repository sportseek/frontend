import { CreateEventPayload } from "types/ArenaOwner"
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IEvent } from "types"
import eventAPI from "./eventAPI"

interface EventState {
  currentEvent: IEvent
  arenaEvents: IEvent[]
  reloadEvents: boolean
}

const initialState: EventState = {
  currentEvent: {} as IEvent,
  arenaEvents: [],
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
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
        state.reloadEvents = true
      })
      .addCase(getArenaEvents.fulfilled, (state, action) => {
        state.arenaEvents = action.payload.arenaEvents
        state.reloadEvents = false
      })
      .addMatcher(
        isAnyOf(
          createEvent.fulfilled,
          updateEvent.fulfilled,
          cancelEvent.fulfilled
        ),
        (state) => {
          state.reloadEvents = true
        }
      )
  },
})

export const selectCurrentEvent = (state: RootState) => state.event.currentEvent
export const selectArenaEvents = (state: RootState) => state.event.arenaEvents
export const selectReloadEvents = (state: RootState) => state.event.reloadEvents

export default eventSlice.reducer
