import { createSlice } from "@reduxjs/toolkit"

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: true,
}

export const sidebarSlice = createSlice({
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

export const { openSideBar, closeSideBar } = sidebarSlice.actions

export default sidebarSlice.reducer
