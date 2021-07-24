import { FunctionComponent, ReactNode } from "react"
import { RouteComponentProps } from "react-router-dom"
import { SvgIcon } from "@material-ui/core"
import {
  PageviewRounded as SearchIcon,
  DashboardRounded as DashboardIcon,
  HelpRounded as HelpIcon,
  MessageRounded as MessageIcon,
  SettingsRounded as SettingsIcon,
} from "@material-ui/icons"

import { UserType } from "types"
import SignIn from "./Sign/SignIn"
import SignUp from "./Sign/SignUp"
import MainLayout, { MainLayoutType } from "./MainLayout/Main"
import Search from "./EventSearch/EventSearch"
import PlayerBoard from "./Dashboard/Player/Dashboard"
import ArenaBoard from "./Dashboard/Arena/ArenaPage"
import EventDetails from "./EventDetails/EventDetailsRoute"

import DummyPage from "./Dummy/DummyPage"

type Page = {
  id: string
  path: string
  header: string
  icon: typeof SvgIcon
  containsHome: boolean
  Component: FunctionComponent<RouteComponentProps>
  children?: ReactNode
}

/**
const Redux: Page = {
  id: "Redux",
  path: "/redux",
  header: "Redux Example",
  icon: ReduxIcon,
  containsHome: true,
  Component: ReduxExample,
} */

const EventSearch: Page = {
  id: "Search",
  path: "/home",
  header: "Search Events",
  icon: SearchIcon,
  containsHome: true,
  Component: Search,
}

const EventDetailsPage: Page = {
  id: "Details",
  path: "/eventdetails/:id",
  header: "Details",
  icon: SearchIcon,
  containsHome: true,
  Component: EventDetails,
}

const PlayerDashBoard: Page = {
  id: "DashBoard",
  path: "/dashboard",
  header: "DashBoard",
  icon: DashboardIcon,
  containsHome: true,
  Component: PlayerBoard,
}

const ArenaDashBoard: Page = {
  id: "DashBoard",
  path: "/home",
  header: "DashBoard",
  icon: DashboardIcon,
  containsHome: true,
  Component: ArenaBoard,
}

const FaqRoutes: Page = {
  id: "F.A.Q",
  path: "/faq",
  header: "F.A.Q",
  icon: HelpIcon,
  containsHome: true,
  Component: DummyPage,
}

const SupportRoutes: Page = {
  id: "Support",
  path: "/support",
  header: "Support",
  icon: MessageIcon,
  containsHome: true,
  Component: DummyPage,
}

const SettingsRoutes: Page = {
  id: "Settings",
  path: "/settings",
  header: "Settings",
  icon: SettingsIcon,
  containsHome: true,
  Component: DummyPage,
}

const PlayerPages = [
  EventSearch,
  PlayerDashBoard,
  SettingsRoutes,
  FaqRoutes,
  SupportRoutes,
]
const ArenaPages = [ArenaDashBoard, SettingsRoutes, FaqRoutes, SupportRoutes]

export const getPages = (type: string, sidebar = false) => {
  switch (type) {
    case UserType.PLAYER:
      return sidebar ? PlayerPages : [EventDetailsPage, ...PlayerPages]
    case UserType.ARENA:
      return sidebar ? ArenaPages : [EventDetailsPage, ...ArenaPages]
    default:
      break
  }
  return []
}

export type { MainLayoutType, Page as PageDataType }

export { SignIn, SignUp, MainLayout }
