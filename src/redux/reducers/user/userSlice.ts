import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { User } from "types"
import userAPI from "./userAPI"

interface UserState {
  loggedInUser: User
}

const initialState: UserState = {
  loggedInUser: {},
}

type Payload = { id: string; type: string }

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (payload: Payload) => {
    const { id, type } = payload
    const response = await userAPI.fetchById(id, type)
    return response.data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.user
    })
  },
})

export const selectUser = (state: RootState) => state.user.loggedInUser

export default userSlice.reducer
