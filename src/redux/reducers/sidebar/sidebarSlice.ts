import { createSlice } from "@reduxjs/toolkit"

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: false,
}

export const counterSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.open = true
    },
    closeSideBar: (state) => {
      state.open = false
    },
  },
})

export const { openSideBar, closeSideBar } = counterSlice.actions

export default counterSlice.reducer
