import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import sidebarReducer from "./ui/uiSlice"
import userReducer from "./user/userSlice"
import authReducer from "./auth/authSlice"
import eventReducer from "./event/eventSlice"

const reducers = {
  counter: counterReducer,
  ui: sidebarReducer,
  user: userReducer,
  auth: authReducer,
  event: eventReducer
}

export default combineReducers(reducers)
