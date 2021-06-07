import {
  Header,
  HeaderOptions,
  SideBar,
  SideBarOptions,
  FilterBar,
  FilterBarOptions,
  Body,
  BodyOptions,
  Footer,
  FooterOptions,
} from "./types"

declare module "@material-ui/core/styles/createMuiTheme" {
  export interface Theme {
    header: Header
    sidebar: SideBar
    filterbar: FilterBar
    body: Body
    footer: Footer
  }
  // allow configuration using `createMuiTheme`
  export interface ThemeOptions {
    sidebar?: SideBarOptions
    filterbar?: FilterBarOptions
    header?: HeaderOptions
    body?: BodyOptions
    footer?: FooterOptions
  }
}
