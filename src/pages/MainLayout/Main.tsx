import React, { PropsWithChildren, FC } from "react"
import { styled } from "@material-ui/core/styles"
import { Hidden, Paper } from "@material-ui/core"
import Helmet from "react-helmet"
import Sidebar from "components/Sidebar"
import Header from "components/Header"

const Root = styled("div")({
  display: "flex",
  minHeight: "100vh",
})

const Drawer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
  },
}))

const AppContent = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  paddingBottom: 28,
  [theme.breakpoints.up("lg")]: {},
}))

const MainContent = styled(Paper)(({ theme }) => ({
  flex: 1,
  background: theme.body.background,
}))

export type MainLayoutProps = PropsWithChildren<{}>

const MainLayout: FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children } = props

  return (
    <Root>
      <Helmet title="Seek your Sport" />
      <Drawer>
        <Hidden mdUp implementation="js">
          <Sidebar variant="temporary" />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar variant="permanent" />
        </Hidden>
      </Drawer>
      <AppContent>
        <Header />
        <MainContent elevation={0}>{children}</MainContent>
      </AppContent>
    </Root>
  )
}

export type MainLayoutType = FC<MainLayoutProps>

export default MainLayout
