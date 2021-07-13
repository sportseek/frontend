import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { ILocation, IUser } from "types"
import { INotification, ReadNotificationPayload } from "types/Notification"
import { ServerErrors } from "utils/constants"
import userAPI from "./userAPI"

type UserErrors = IUser | []
interface UserState {
  loggedInUser: IUser
  location: ILocation
  loading: boolean
  errors: UserErrors
  hasErrors: boolean
  notifications: INotification[]
}

const initialState: UserState = {
  loggedInUser: {} as IUser,
  location: {} as ILocation,
  loading: false,
  hasErrors: true,
  errors: {} as UserErrors,
  notifications: [],
}

export const fetchLoggedInUser = createAsyncThunk(
  "users/fetchById",
  async () => {
    try {
      const response = await userAPI.fetchById()
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return err.response.data
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/update",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(user)
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateProfilePic = createAsyncThunk(
  "user/updateProfilePic",
  async (imagePayload: any, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfilePic(imagePayload)
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  }
)

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.addFriend(email)
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  }
)

export const removeFriend = createAsyncThunk(
  "user/removeFriend",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await userAPI.removeFriend(ids)
      return response.data
    } catch (err) {
      if (!err.response) throw err
      return rejectWithValue(err.response.data)
    }
  }
)

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (pageNumber: number) => {
    const response = await userAPI.getNotifications(pageNumber)
    return response.data
  }
)

export const readNotification = createAsyncThunk(
  "notification/readNotification",
  async (payload: ReadNotificationPayload) => {
    const response1 = await userAPI.readNotification(payload.notificationId)
    const response = await userAPI.getNotifications(payload.pageNumber)
    return response.data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    prepareForValidation: (state) => {
      state.hasErrors = true
      state.errors = {} as UserErrors
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          addFriend.fulfilled,
          removeFriend.fulfilled,
          fetchLoggedInUser.fulfilled,
          updateUser.fulfilled,
          updateProfilePic.fulfilled
        ),
        (state, action) => {
          state.loggedInUser = action.payload.user
          state.location = action.payload.user.location
          state.loading = false
          state.hasErrors = false
          state.errors = {} as UserErrors
        }
      )
      .addMatcher(
        isAnyOf(
          addFriend.pending,
          removeFriend.pending,
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
          addFriend.rejected,
          removeFriend.rejected,
          fetchLoggedInUser.rejected,
          updateUser.rejected,
          updateProfilePic.rejected
        ),
        (state, action) => {
          state.loading = false
          const errs =
            action.payload === undefined ? ServerErrors : action.payload
          state.errors = errs as UserErrors
          state.hasErrors = true
        }
      )
      .addMatcher(
        isAnyOf(getNotifications.fulfilled, readNotification.fulfilled),
        (state, action) => {
          state.notifications = action.payload.notifications
        }
      )
  },
})

export const { prepareForValidation } = userSlice.actions

export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser
export const selectLoadingUserData = (state: RootState) => state.user.loading
export const selectUserErrors = (state: RootState) => state.user.errors
export const selectHasUserErrors = (state: RootState) => state.user.hasErrors
export const selectUserLocation = (state: RootState) => state.user.location
export const selectUserNotification = (state: RootState) =>
  state.user.notifications

export default userSlice.reducer
