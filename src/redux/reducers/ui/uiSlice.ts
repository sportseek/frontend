import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

export interface UIState {
  openSidebar: boolean
}

const initialState: UIState = {
  openSidebar: true,
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.openSidebar = true
    },
    closeSideBar: (state) => {
      state.openSidebar = false
    },
  },
})

export const selectOpenSideBar = (state: RootState) => state.ui.openSidebar

export const { openSideBar, closeSideBar } = sidebarSlice.actions

export default sidebarSlice.reducer
