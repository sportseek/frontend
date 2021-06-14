import { ThemeOptions as MuiThemeOptions } from "@material-ui/core"
import React from "react"

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

export interface Calendar {
  interestedEventColor: {main: React.CSSProperties["color"], disabled: React.CSSProperties["color"]}
  registeredEventColor: {main: React.CSSProperties["color"], disabled: React.CSSProperties["color"]}
  personalEventColor: {main: React.CSSProperties["color"], disabled: React.CSSProperties["color"]}
}

export type CalendarOptions = Partial<Calendar>

export interface Footer {
  background: React.CSSProperties["background"]
  height: React.CSSProperties["height"]
}

export type FooterOptions = Partial<Footer>
