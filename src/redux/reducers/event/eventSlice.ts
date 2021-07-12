import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IEvent, CreateEventPayload } from "types"
import {
  SearchEventPayload,
  UpdateInterestedPayload,
  UpdateRegisteredPayload,
  SearchEventsByCreatorPayload,
} from "types/Event"
import eventAPI from "./eventAPI"

interface EventState {
  curEventId: string
  currentEvent: IEvent
  events: IEvent[]
  allEvents: IEvent[]
  reloadEvents: boolean
  maxPrice: number
  minPrice: number
  maxDate: string
  minDate: string
}

const initialState: EventState = {
  curEventId: "",
  currentEvent: {} as IEvent,
  events: [],
  allEvents: [],
  reloadEvents: false,
  maxPrice: 0,
  minPrice: 0,
  maxDate: "",
  minDate: "",
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

export const getAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async (searchPayload: SearchEventPayload) => {
    const response = await eventAPI.fetchAllEventList(searchPayload)
    return response.data
  }
)

export const updateInterested = createAsyncThunk(
  "event/updateInterested",
  async (interestedPayload: UpdateInterestedPayload) => {
    const response = await eventAPI.updateInterested(interestedPayload)
    return response.data
  }
)

export const updateRegistered = createAsyncThunk(
  "event/updateRegistered",
  async (registeredPayload: UpdateRegisteredPayload) => {
    const response = await eventAPI.updateRegistered(registeredPayload)
    return response.data
  }
)

export const getMinMaxPrice = createAsyncThunk(
  "event/getMinMaxPrice",
  async () => {
    const response = await eventAPI.getMinMaxPrice()
    return response.data
  }
)

export const fetchAllEventsByCreator = createAsyncThunk(
  "events/fetchAllEventsByCreator",
  async (searchPayload: SearchEventsByCreatorPayload) => {
    const response = await eventAPI.fetchAllEventsByCreator(searchPayload)
    return response.data
  }
)

export const getMinMaxDate = createAsyncThunk(
  "event/getMinMaxDate",
  async () => {
    const response = await eventAPI.getMinMaxDate()
    return response.data
  }
)

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setCurEventId: (state, action: PayloadAction<string>) => {
      state.curEventId = action.payload
    },
    clearEventDetails: (state) => {
      state.curEventId = ""
    },
  },
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
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.allEvents = action.payload.eventList
        state.reloadEvents = false
      })
      .addCase(updateInterested.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
        state.reloadEvents = true
      })
      .addCase(updateRegistered.fulfilled, (state, action) => {
        state.currentEvent = action.payload.event
        state.reloadEvents = true
      })
      .addCase(getMinMaxPrice.fulfilled, (state, action) => {
        state.minPrice = action.payload.minEvent.entryFee
        state.maxPrice = action.payload.maxEvent.entryFee
      })
      .addCase(fetchAllEventsByCreator.fulfilled, (state, action) => {
        state.events = action.payload.eventList
        //state.reloadEvents = false
      })
      .addCase(getMinMaxDate.fulfilled, (state, action) => {
        state.minDate = action.payload.minEvent.start
        state.maxDate = action.payload.maxEvent.start
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
export const selectAllEvents = (state: RootState) => state.event.allEvents
export const selectCurrentEventId = (state: RootState) => state.event.curEventId
export const selectEventMaxPrice = (state: RootState) => state.event.maxPrice
export const selectEventMinPrice = (state: RootState) => state.event.minPrice
export const selectAllEventsByCreator = (state: RootState) => state.event.events
export const selectEventMaxDate = (state: RootState) => state.event.maxDate
export const selectEventMinDate = (state: RootState) => state.event.minDate

export const { clearEventDetails, setCurEventId } = eventSlice.actions

export default eventSlice.reducer
