import { PlayerSignupPayload } from "components/PlayerSignup/PlayerSignup"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { ArenaSignupPayload } from "components/ArenaSignup/ArenaSignup"
import { UserSigninPayload } from "components/SigninForm/SigninForm"
import authAPI from "./authAPI"

type AuthStatus = "idle" | "loggedIn" | "requesting" | "failed"

type UserType = "player" | "arena"

interface AuthState {
  isAuthenticated: boolean
  userType: string
  userId: string
  status: AuthStatus
  errorMsg: string
}

export const userSignIn = createAsyncThunk(
  "auth/signin",
  async (payload: UserSigninPayload) => {
    const response = await authAPI.signin(payload)
    return response.data
  }
)

export const playerSignup = createAsyncThunk(
  "auth/playerSignup",
  async (payload: PlayerSignupPayload) => {
    const response = await authAPI.playerSignup(payload)
    return response.data
  }
)

export const arenaSignup = createAsyncThunk(
  "auth/arenaSignup",
  async (payload: ArenaSignupPayload) => {
    const response = await authAPI.arenaSignup(payload)
    return response.data
  }
)

const initialState: AuthState = {
  isAuthenticated: false,
  userType: "player",
  userId: "12345",
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
      state.userId = ""
    },
    setUser: (state, action: PayloadAction<{ id: string; type: string }>) => {
      state.userId = action.payload.id
      state.userType = action.payload.type
      state.status = "loggedIn"
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        const { userId, token, type } = action.payload.result
        state.isAuthenticated = action.payload.success
        state.status = "loggedIn"
        state.userId = userId
        state.userType = type
        window.localStorage.setItem("jwtToken", token)
        window.localStorage.setItem("userId", userId)
        window.localStorage.setItem("userType", type)
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
        state.userId = action.payload.result.userId
        state.userType = action.payload.result.type
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
        state.userId = action.payload.result.userId
        state.userType = action.payload.result.type
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
export const selectUserType = (state: RootState) => state.auth.userType
export const selectUserId = (state: RootState) => state.auth.userId

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer
