import { ThemeOptions as MuiThemeOptions } from "@material-ui/core"

export interface ThemeOptions extends MuiThemeOptions {
  header: Header
  sidebar: SideBar
  body: Body
}

export interface Header {
  height: React.CSSProperties["height"]
  background: React.CSSProperties["color"]
}

export type HeaderOptions = Partial<Header>

export interface SideBar {
  width: React.CSSProperties["width"]
  footer: {
    color: React.CSSProperties["color"]
    background: React.CSSProperties["color"]
  }
}

export type SideBarOptions = Partial<SideBar>

export interface Body {
  background: React.CSSProperties["background"]
}

export type BodyOptions = Partial<Body>
