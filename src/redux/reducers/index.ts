import counterReducer from "./counter/counterSlice"
import sidebarReducer from "./sidebar/sidebarSlice"
import userReducer from "./user/userSlice"

const reducers = {
  counter: counterReducer,
  sidebar: sidebarReducer,
  user: userReducer,
}

export default reducers
