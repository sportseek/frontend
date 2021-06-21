import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import counterReducer from "./counter/counterSlice"
import uiReducer from "./ui/uiSlice"
import userReducer from "./user/userSlice"
import authReducer from "./auth/authSlice"
import eventReducer from "./event/eventSlice"
import peventReduer from "./pEvent/pEventSlice"

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["location"],
}

const eventPersistConfig = {
  key: "event",
  storage,
  whitelist: ["curEventId"],
}

const reducers = {
  counter: counterReducer,
  ui: uiReducer,
  user: persistReducer(userPersistConfig, userReducer),
  auth: authReducer,
  event: persistReducer(eventPersistConfig, eventReducer),
  pevent: peventReduer,
}

export default combineReducers(reducers)
