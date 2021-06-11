import {
  Header,
  HeaderOptions,
  SideBar,
  SideBarOptions,
  Body,
  BodyOptions,
  Calendar,
  CalendarOptions,
  Footer,
  FooterOptions,
} from "./types"

declare module "@material-ui/core/styles/createMuiTheme" {
  export interface Theme {
    header: Header
    sidebar: SideBar
    body: Body
    calendar: Calendar
    footer: Footer
  }
  // allow configuration using `createMuiTheme`
  export interface ThemeOptions {
    sidebar?: SideBarOptions
    header?: HeaderOptions
    body?: BodyOptions
    calendar?: CalendarOptions
    footer?: FooterOptions
  }
}
