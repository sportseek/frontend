import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import counterReducer from "./counter/counterSlice"
import uiReducer from "./ui/uiSlice"
import userReducer from "./user/userSlice"
import authReducer from "./auth/authSlice"
import eventReducer from "./event/eventSlice"
import peventReduer from "./pEvent/pEventSlice"
import arenaReducer from "./arena/arenaSlice"

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["location"],
}

// const arenaPersistConfig = {
//   key: "arena",
//   storage,
//   whitelist: ["curArenaId"],
// }

const eventPersistConfig = {
  key: "event",
  storage,
  whitelist: ["curEventId"],
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "userType"],
}

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["openSidebar", "openSidebarMobile"],
}

const reducers = {
  counter: counterReducer,
  ui: persistReducer(uiPersistConfig, uiReducer),
  user: persistReducer(userPersistConfig, userReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  event: persistReducer(eventPersistConfig, eventReducer),
  arena: arenaReducer,
  pevent: peventReduer,
}

export default combineReducers(reducers)
