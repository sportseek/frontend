import { PlayerSignupPayload } from "components/PlayerSignup/PlayerSignup"
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { ArenaSignupPayload } from "components/ArenaSignup/ArenaSignup"
import { UserSigninPayload } from "components/SigninForm/SigninForm"
import { UserType } from "types"
import authAPI from "./authAPI"

enum AuthStatus {
  IDLE = "idle",
  DONE = "loggedIn",
  PROCESSING = "requesting",
  FAILED = "failed",
}

interface AuthState {
  isAuthenticated: boolean
  userType: UserType
  status: AuthStatus
  errors: string[]
}

type ValidationErrors = {
  success?: boolean
  errors: string[]
}

export const userSignIn = createAsyncThunk(
  "auth/signin",
  async (payload: UserSigninPayload, { rejectWithValue }) => {
    try {
      const response = await authAPI.signin(payload)
      return response.data
    } catch (error) {
      if (!error.response) throw error
      return rejectWithValue(error.response.data)
    }
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
  userType: UserType.PLAYER,
  status: AuthStatus.IDLE,
  errors: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.errors = []
      state.status = AuthStatus.IDLE
      window.localStorage.removeItem("authToken")
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          userSignIn.fulfilled,
          playerSignup.fulfilled,
          arenaSignup.fulfilled
        ),
        (state, action) => {
          const { token, userType } = action.payload.result

          state.isAuthenticated = true
          state.status = AuthStatus.DONE
          state.userType = userType
          window.localStorage.setItem("authToken", token)
        }
      )
      .addMatcher(
        isAnyOf(
          userSignIn.rejected,
          arenaSignup.rejected,
          playerSignup.rejected
        ),
        (state, action) => {
          const { errors } = action.payload as ValidationErrors
          state.isAuthenticated = false
          state.status = AuthStatus.FAILED
          state.errors = errors
        }
      )
      .addMatcher(
        isAnyOf(arenaSignup.pending, playerSignup.pending, userSignIn.pending),
        (state) => {
          state.status = AuthStatus.PROCESSING
        }
      )
  },
})

export const isIfAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUserType = (state: RootState) => state.auth.userType
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthErrors = (state: RootState) => state.auth.errors

export const { logout } = authSlice.actions

export default authSlice.reducer
