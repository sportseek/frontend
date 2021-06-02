import { PlayerSignupPayload } from './../../../components/PlayerSignup/PlayerSignup';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import authAPI from "./authAPI"
import { ArenaSignupPayload } from 'components/ArenaSignup/ArenaSignup';
import { UserSigninPayload } from 'components/Signin/Signin';

type AuthStatus = "idle" | "loggedIn" | "requesting" | "failed"

interface AuthState {
  isAuthenticated: boolean
  type: "player" | "arena"
  userid: string
  status: AuthStatus
  errorMsg: string
}

export const userSignIn = createAsyncThunk("auth/signin", async (payload: UserSigninPayload) => {
  const response = await authAPI.signin(payload)
  return response.data
})

export const playerSignup = createAsyncThunk("auth/playerSignup", async (payload: PlayerSignupPayload) => {
  const response = await authAPI.playerSignup(payload)
  return response.data
})

export const arenaSignup = createAsyncThunk("auth/arenaSignup", async (payload: ArenaSignupPayload) => {
  const response = await authAPI.arenaSignup(payload)
  return response.data
})

const initialState: AuthState = {
  isAuthenticated: false,
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
        state.isAuthenticated = action.payload.success
        state.status = "loggedIn"
        state.userid = action.payload.result.userId
        state.type = action.payload.type
        window.localStorage.setItem("jwtToken", action.payload.result.token)
      })
      .addCase(userSignIn.pending, (state) => {
        state.status = "requesting"
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isAuthenticated = false
        state.status = "failed"
        state.errorMsg = (action.payload as any).errors
      })
      .addCase(playerSignup.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success
        state.status = "loggedIn"
        state.userid = action.payload.result.userId
        state.type = action.payload.type
        window.localStorage.setItem("jwtToken", action.payload.result.token)
      })
      .addCase(playerSignup.rejected, (state, action) => {
        state.isAuthenticated = false
        state.status = "failed"
        state.errorMsg = action.payload as string
      })
      .addCase(playerSignup.pending, (state) => {
        state.status = "requesting"
      })

      .addCase(arenaSignup.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success
        state.status = "loggedIn"
        state.userid = action.payload.result.userId
        state.type = action.payload.type
        window.localStorage.setItem("jwtToken", action.payload.result.token)
      })
      .addCase(arenaSignup.rejected, (state, action) => {
        state.isAuthenticated = false
        state.status = "failed"
        state.errorMsg = action.payload as string
      })
      .addCase(arenaSignup.pending, (state) => {
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
