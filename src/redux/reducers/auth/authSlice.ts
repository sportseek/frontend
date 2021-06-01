import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import authAPI from "./authAPI"

type AuthStatus = "idle" | "loggedIn" | "requesting" | "failed"

interface AuthState {
  isAuthenticated: boolean
  type: "player" | "arena"
  userid: string
  status: AuthStatus
  errorMsg: string
}

export const userSignIn = createAsyncThunk("auth/signin", async () => {
  const response = await authAPI.signup()
  return response.data
})

export const userSignUp = createAsyncThunk("auth/signup", async () => {
  const response = await authAPI.signup()
  return response.data
})

const initialState: AuthState = {
  isAuthenticated: true,
  type: "player",
  userid: "12345",
  status: "idle",
  errorMsg: "",
}

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.errorMsg = ""
      state.status = "idle"
      state.userid = ""
      window.localStorage.removeItem("jwtToken")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload
        state.status = "loggedIn"
      })
      .addCase(userSignIn.pending, (state) => {
        state.status = "requesting"
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isAuthenticated = false
        state.status = "failed"
        state.errorMsg = action.payload as string
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload
        state.status = "loggedIn"
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isAuthenticated = false
        state.status = "failed"
        state.errorMsg = action.payload as string
      })
      .addCase(userSignUp.pending, (state) => {
        state.status = "requesting"
      })
  },
})

export const isIfAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUserType = (state: RootState) => state.auth.type
export const selectUserId = (state: RootState) => state.auth.userid

export const { logout } = authSlice.actions

export default authSlice.reducer
