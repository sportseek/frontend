import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { Event } from "types"
import eventAPI from "./eventAPI"

interface EventState {
  currentEvent: Event
}

const initialState: EventState = {
  currentEvent: { _id: "" },
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
  async (event: Event) => {
    const response = await eventAPI.update(event)
    return response.data
  }
)

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(fetchEventById.fulfilled, updateEvent.fulfilled),
      (state, action) => {
        state.currentEvent = action.payload.event
      }
    )
  },
})

export const selectCurrentEvent = (state: RootState) => state.event.currentEvent

export default eventSlice.reducer
