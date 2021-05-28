import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import sidebarReducer from "./ui/uiSlice"
import userReducer from "./user/userSlice"
import authReducer from "./auth/authSlice"

const reducers = {
  counter: counterReducer,
  ui: sidebarReducer,
  user: userReducer,
  auth: authReducer,
}

export default combineReducers(reducers)
