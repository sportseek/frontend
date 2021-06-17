import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IUser } from "types"
import userAPI from "./userAPI"

interface UserState {
  loggedInUser: IUser
}

const initialState: UserState = {
  loggedInUser: { location: { lat: 0, lng: 0 } } as IUser,
}

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchById",
  async () => {
    const response = await userAPI.fetchById()
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

export const updateProfilePic = createAsyncThunk(
  "user/updateArena",
  async (imagePayload: any) => {
    const response = await userAPI.updateProfilePic(imagePayload)
    return response.data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user
      })
  },
})

export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser

export default userSlice.reducer
