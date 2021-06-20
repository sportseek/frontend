import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

export interface UIState {
  openSidebar: boolean
  openSidebarMobile: boolean
  searchPageTabIndex: 0 | 1
}

const initialState: UIState = {
  openSidebar: false,
  openSidebarMobile: false,
  searchPageTabIndex: 0,
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
    setSearchPageTabIndex: (state, action: PayloadAction<0 | 1>) => {
      state.searchPageTabIndex = action.payload
    },
  },
})

export const selectOpenSideBar = (state: RootState) => state.ui.openSidebar

export const selectOpenSideBarMobile = (state: RootState) =>
  state.ui.openSidebarMobile

export const selectSearchPageTabIndex = (state: RootState) =>
  state.ui.searchPageTabIndex

export const {
  openSideBar,
  closeSideBar,
  openSideBarMobile,
  closeSideBarMobile,
  setSearchPageTabIndex,
} = sidebarSlice.actions

export default sidebarSlice.reducer
