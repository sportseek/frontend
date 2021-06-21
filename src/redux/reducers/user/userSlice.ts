import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IUser } from "types"
import userAPI from "./userAPI"

interface UserState {
  loggedInUser: IUser
  loading: boolean
}

const initialState: UserState = {
  loggedInUser: { location: { lat: 0, lng: 0 } } as IUser,
  loading: false,
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
      .addMatcher(
        isAnyOf(
          fetchLoggedInUser.fulfilled,
          updateUser.fulfilled,
          updateProfilePic.fulfilled
        ),
        (state, action) => {
          state.loggedInUser = action.payload.user
          state.loading = false
        }
      )
      .addMatcher(
        isAnyOf(
          fetchLoggedInUser.pending,
          updateUser.pending,
          updateProfilePic.pending
        ),
        (state) => {
          state.loading = true
        }
      )
      .addMatcher(
        isAnyOf(
          fetchLoggedInUser.rejected,
          updateUser.rejected,
          updateProfilePic.rejected
        ),
        (state) => {
          state.loading = false
        }
      )
  },
})

export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser
export const selectLoadingUserData = (state: RootState) => state.user.loading

export default userSlice.reducer
