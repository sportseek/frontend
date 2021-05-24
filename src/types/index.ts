import { ThemeOptions as MuiThemeOptions } from "@material-ui/core"
import React, { FunctionComponent, ReactNode } from "react"
import { RouteComponentProps } from "react-router-dom"

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

export type Page = {
  id: string
  path: string
  header: string
  icon: FunctionComponent
  containsHome: true
  Component: FunctionComponent<RouteComponentProps>
  children?: ReactNode
}
