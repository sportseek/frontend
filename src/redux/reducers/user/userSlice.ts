import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
  isAuthenticated: boolean
  type: "player" | "arena"
  id: string
}

const initialState: UserState = {
  isAuthenticated: true,
  type: "player",
  id: "12345",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuthenticated = true
    },
  },
})

export const { authenticateUser } = userSlice.actions

export default userSlice.reducer
