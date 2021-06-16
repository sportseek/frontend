import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IPersonalEvent, PEventPayload } from "types"
import pEventAPI from "./pEventAPI"

type ValidationErrors = { title: { message: string } }

interface PersonalEventState {
  events: IPersonalEvent[]
  needToUpdate: boolean
  errors: ValidationErrors
  hasErrors: boolean
}

const initialState: PersonalEventState = {
  events: [],
  needToUpdate: false,
  errors: {} as ValidationErrors,
  hasErrors: true,
}

export const createPEvent = createAsyncThunk(
  "personalevent/create",
  async (payload: PEventPayload, { rejectWithValue }) => {
    try {
      const response = await pEventAPI.create(payload)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchPEvents = createAsyncThunk(
  "personalevent/fetchEventList",
  async () => {
    const response = await pEventAPI.fetchEventList()
    return response.data
  }
)

export const deletePEvent = createAsyncThunk(
  "personalevent/delete",
  async (id: string) => {
    const response = await pEventAPI.deleteEvent(id)
    return response.data
  }
)

export const pEventSlice = createSlice({
  name: "personalevent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPEvents.fulfilled, (state, action) => {
        state.events = action.payload.events
        state.needToUpdate = false
      })
      .addCase(createPEvent.fulfilled, (state) => {
        state.needToUpdate = true
        state.hasErrors = false
        state.errors = {} as ValidationErrors
      })
      .addCase(createPEvent.rejected, (state, action) => {
        state.errors = action.payload as ValidationErrors
        state.hasErrors = true
      })
      .addCase(deletePEvent.fulfilled, (state) => {
        state.needToUpdate = true
      })
  },
})

export const selectEvents = (state: RootState) => state.pevent.events
export const selectErrors = (state: RootState) => state.pevent.errors
export const selectHasErrors = (state: RootState) => state.pevent.hasErrors
export const selectNeedToUpdate = (state: RootState) =>
  state.pevent.needToUpdate

export default pEventSlice.reducer
