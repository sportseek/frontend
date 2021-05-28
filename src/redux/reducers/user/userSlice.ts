import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { Player, ArenaOwner } from "types"
import userAPI from "./userAPI"

interface UserState {
  loggedInUser: Player | ArenaOwner | {}
}

const initialState: UserState = {
  loggedInUser: {}
}

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string) => {
    const response = await userAPI.fetchById(userId)
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
        state.loggedInUser = action.payload
      })
  },
})

export const selectUser = (state: RootState) => state.user.loggedInUser

export default userSlice.reducer
