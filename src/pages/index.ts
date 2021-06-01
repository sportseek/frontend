import { FunctionComponent, ReactNode } from "react"
import { RouteComponentProps } from "react-router-dom"
import { SvgIcon } from "@material-ui/core"
import {
  PageviewRounded as SearchIcon,
  DashboardRounded as DashboardIcon,
  AdjustTwoTone as ReduxIcon,
  HelpRounded as HelpIcon,
  MessageRounded as MessageIcon,
  SettingsRounded as SettingsIcon,
} from "@material-ui/icons"
import SignIn from "./Sign/SignIn"
import SignUp from "./Sign/SignUp"
import SignUpArena from "./Sign/SignUpArena"
import MainLayout, { MainLayoutType } from "./MainLayout/Main"
import ReduxExample from "./ReduxExample/ReduxExample"
import Search from "./EventSearch/Search"
import PlayerBoard from "./Dashboard/Player/Dashboard"
import ArenaBoard from "./Dashboard/Arena/ArenaPage"

type Page = {
  id: string
  path: string
  header: string
  icon: typeof SvgIcon
  containsHome: true
  Component: FunctionComponent<RouteComponentProps>
  children?: ReactNode
}

const Redux: Page = {
  id: "Redux",
  path: "/redux",
  header: "Redux Example",
  icon: ReduxIcon,
  containsHome: true,
  Component: ReduxExample,
}

const EventSearch: Page = {
  id: "Search",
  path: "/home",
  header: "Search Events",
  icon: SearchIcon,
  containsHome: true,
  Component: Search,
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
  Component: ReduxExample,
}

const SupportRoutes: Page = {
  id: "Support",
  path: "/support",
  header: "Support",
  icon: MessageIcon,
  containsHome: true,
  Component: ReduxExample,
}

const SettingsRoutes: Page = {
  id: "Settings",
  path: "/settings",
  header: "Settings",
  icon: SettingsIcon,
  containsHome: true,
  Component: ReduxExample,
}

const PlayerPages = [
  PlayerDashBoard,
  EventSearch,
  Redux,
  SettingsRoutes,
  FaqRoutes,
  SupportRoutes,
]
const ArenaPages = [ArenaDashBoard, SupportRoutes]

export const getPages = (type: string) =>
  type === "player" ? PlayerPages : ArenaPages

export type { MainLayoutType, Page as PageDataType }

export { SignIn, SignUp, SignUpArena, MainLayout }
