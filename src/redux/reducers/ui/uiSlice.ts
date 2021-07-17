import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

export interface UIState {
  openSidebar: boolean
  openSidebarMobile: boolean
}

const initialState: UIState = {
  openSidebar: true,
  openSidebarMobile: false,
}

export const sidebarSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.openSidebar = true
    },
    closeSideBar: (state) => {
      state.openSidebar = false
    },
    openSideBarMobile: (state) => {
      state.openSidebarMobile = true
    },
    closeSideBarMobile: (state) => {
      state.openSidebarMobile = false
    },
  },
})

export const selectOpenSideBar = (state: RootState) => state.ui.openSidebar

export const selectOpenSideBarMobile = (state: RootState) =>
  state.ui.openSidebarMobile

export const {
  openSideBar,
  closeSideBar,
  openSideBarMobile,
  closeSideBarMobile,
} = sidebarSlice.actions

export default sidebarSlice.reducer
