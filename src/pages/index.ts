import { Search as SearchIcon } from "@material-ui/icons"
import { Page } from "types"
import SignIn from "./Sign/SignIn"
import SignUp from "./Sign/SignUp"
import MainLayout, { MainLayoutType } from "./MainLayout/Main"
import ReduxExample from "./ReduxExample/ReduxExample"
import Search from "./EventSearch/Search"
import PlayerBoard from "./Dashboard/Player/PlayerPage"
import ArenaBoard from "./Dashboard/Arena/ArenaPage"

const Redux: Page = {
  id: "Redux",
  path: "/home",
  header: "Redux Example",
  icon: SearchIcon,
  containsHome: true,
  Component: ReduxExample,
}

const EventSearch: Page = {
  id: "Search",
  path: "/search",
  header: "Search Events",
  icon: SearchIcon,
  containsHome: true,
  Component: Search,
}

const PlayerDashBoard: Page = {
  id: "Search",
  path: "/dashboard",
  header: "Search Events",
  icon: SearchIcon,
  containsHome: true,
  Component: PlayerBoard,
}

const ArenaDashBoard: Page = {
  id: "Search",
  path: "/home",
  header: "Search Events",
  icon: SearchIcon,
  containsHome: true,
  Component: ArenaBoard,
}

const PlayerPages = [Redux, EventSearch, PlayerDashBoard]
const ArenaPages = [ArenaDashBoard]

export const getPages = (type: string) =>
  type === "player" ? PlayerPages : ArenaPages

export type { MainLayoutType }

export { SignIn, SignUp, MainLayout }
