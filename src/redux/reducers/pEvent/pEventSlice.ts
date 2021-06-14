import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IPersonalEvent, PEventPayload } from "types"
import pEventAPI from "./pEventAPI"

interface PersonalEventState {
  events: IPersonalEvent[]
  needToUpdate: boolean
}

const initialState: PersonalEventState = {
  events: [],
  needToUpdate: false,
}

export const createEvent = createAsyncThunk(
  "personalevent/create",
  async (payload: PEventPayload) => {
    const response = await pEventAPI.create(payload)
    return response.data
  }
)

export const getEvents = createAsyncThunk(
  "personalevent/fetchEventList",
  async () => {
    const response = await pEventAPI.fetchEventList()
    return response.data
  }
)

export const pEventSlice = createSlice({
  name: "personalevent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload.events
        state.needToUpdate = false
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.needToUpdate = true
      })
  },
})

export const selectEvents = (state: RootState) => state.pevent.events
export const selectNeedToUpdate = (state: RootState) =>
  state.pevent.needToUpdate

export default pEventSlice.reducer
