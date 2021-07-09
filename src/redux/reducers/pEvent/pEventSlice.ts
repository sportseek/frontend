import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IPersonalEvent, PEventPayload } from "types"
import { SearchPEventPayload } from "types/PersonalEvent"
import { ServerErrors } from "utils/constants"
import pEventAPI from "./pEventAPI"

type FormValidationErrors = PEventPayload | []

interface PersonalEventState {
  events: IPersonalEvent[]
  needToUpdate: boolean
  errors: FormValidationErrors
  hasErrors: boolean
  eventsForInvite: IPersonalEvent[]
}

const initialState: PersonalEventState = {
  events: [],
  needToUpdate: false,
  errors: {} as FormValidationErrors,
  hasErrors: true,
  eventsForInvite: [],
}

export const createPEvent = createAsyncThunk(
  "personalevent/create",
  async (payload: PEventPayload, { rejectWithValue }) => {
    try {
      const response = await pEventAPI.create(payload)
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchPEvents = createAsyncThunk(
  "personalevent/fetchEventList",
  async () => {
    try {
      const response = await pEventAPI.fetchEventList()
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return err.response.data
    }
  }
)

export const deletePEvent = createAsyncThunk(
  "personalevent/delete",
  async (id: string) => {
    const response = await pEventAPI.deleteEvent(id)
    return response.data
  }
)

export const getAllPEvents = createAsyncThunk(
  "events/fetchAllPEvents",
  async (searchPayload: SearchPEventPayload) => {
    const response = await pEventAPI.fetchAllPEvents(searchPayload)
    return response.data
  }
)

export const pEventSlice = createSlice({
  name: "personalevent",
  initialState,
  reducers: {
    prepareForValidation: (state) => {
      state.hasErrors = true
      state.errors = {} as FormValidationErrors
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPEvents.fulfilled, (state, action) => {
        state.events = action.payload.events
        state.needToUpdate = false
      })
      .addCase(fetchPEvents.rejected, (state, action) => {
        const errs =
          action.payload === undefined ? [ServerErrors] : action.payload
        state.errors = errs as FormValidationErrors
        state.events = []
        state.hasErrors = true
      })
      .addCase(createPEvent.fulfilled, (state) => {
        state.needToUpdate = true
        state.hasErrors = false
        state.errors = {} as FormValidationErrors
      })
      .addCase(createPEvent.rejected, (state, action) => {
        const errs =
          action.payload === undefined ? [ServerErrors] : action.payload
        state.errors = errs as FormValidationErrors
        state.hasErrors = true
      })
      .addCase(deletePEvent.fulfilled, (state) => {
        state.needToUpdate = true
      })
      .addCase(deletePEvent.rejected, (state, action) => {
        state.needToUpdate = true
        const errs =
          action.payload === undefined ? [ServerErrors] : action.payload
        state.errors = errs as FormValidationErrors
        state.hasErrors = true
      })
      .addCase(getAllPEvents.fulfilled, (state, action) => {
        state.eventsForInvite = action.payload.eventList
      })
  },
})

export const { prepareForValidation } = pEventSlice.actions

export const selectEvents = (state: RootState) => state.pevent.events
export const selectErrors = (state: RootState) => state.pevent.errors
export const selectHasErrors = (state: RootState) => state.pevent.hasErrors
export const selectNeedToUpdatePersonalEventList = (state: RootState) =>
  state.pevent.needToUpdate
export const selectInviteEvents = (state: RootState) =>
  state.pevent.eventsForInvite

export default pEventSlice.reducer
