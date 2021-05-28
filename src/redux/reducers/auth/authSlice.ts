import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

interface AuthState {
  isAuthenticated: boolean
  type: "player" | "arena"
  userid: string
}

const initialState: AuthState = {
  isAuthenticated: true,
  type: "player",
  userid: "12345",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      state.isAuthenticated = true
    },
    signup: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const isIfAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUserType = (state: RootState) => state.auth.type
export const selectUserId = (state: RootState) => state.auth.userid

export const { signin, signup, logout } = authSlice.actions

export default authSlice.reducer
