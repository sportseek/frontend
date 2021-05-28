import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { Player, ArenaOwner } from "types"

interface UserState extends Player, ArenaOwner {}

const initialState: UserState = {
  type: "player",
  id: "12345",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.type = "player"
    },
  },
})

export const { authenticateUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
