import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"
import { IArenaOwner } from "types"
import arenaAPI from "./arenaAPI"

interface ArenaState {
  curArenaId: string
  currentArena: IArenaOwner
}

const initialState: ArenaState = {
  curArenaId: "",
  currentArena: {} as IArenaOwner,
}

export const fetchArenaById = createAsyncThunk(
  "arena/fetchArenaById",
  async (id: string) => {
    const response = await arenaAPI.fetchArenaById(id)
    return response.data
  }
)

export const arenaSlice = createSlice({
  name: "arena",
  initialState,
  reducers: {
    setCurArenaId: (state, action: PayloadAction<string>) => {
      state.curArenaId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArenaById.fulfilled, (state, action) => {
      state.currentArena = action.payload.user
    })
  },
})

export const selectCurrentArena = (state: RootState) => state.arena.currentArena

export default arenaSlice.reducer
