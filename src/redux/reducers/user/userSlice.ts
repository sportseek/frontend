import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IUser, IPlayer } from "types"
import userAPI from "./userAPI"

interface UserState {
  loggedInUser: IUser
}

const initialState: UserState = {
  loggedInUser: {
    _id: "",
    location: { lat: 48.137154, lng: 11.576124 },
    profileImageUrl: "",
  },
}

type FetchPayload = { id: string; type: string }

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (payload: FetchPayload) => {
    const { id, type } = payload
    const response = await userAPI.fetchById(id, type)
    return response.data
  }
)

export const updateUser = createAsyncThunk(
  "user/update",
  async (user: IUser) => {
    const response = await userAPI.update(user)
    return response.data
  }
)

export const updateArenaImage = createAsyncThunk(
  "user/updateArena",
  async (imagePayload: any) => {
    const response = await userAPI.updateArenaImage(imagePayload)
    return response.data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
      .addCase(updateArenaImage.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
  },
})

export const selectUser = (state: RootState) => state.user.loggedInUser
export const selectUserLocation = (state: RootState) =>
  state.user.loggedInUser.location
export const selectRegtedEventIds = (state: RootState) =>
  (state.user.loggedInUser as IPlayer).registeredEvents
export const selectInstedEventIds = (state: RootState) =>
  (state.user.loggedInUser as IPlayer).interestedEvents

export default userSlice.reducer
