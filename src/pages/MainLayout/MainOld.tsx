import React, { PropsWithChildren, FC } from "react"
import { styled } from "@material-ui/core/styles"
import { Box, Hidden } from "@material-ui/core"
import withWidth, {
  isWidthUp,
  WithWidthProps,
} from "@material-ui/core/withWidth"
import Helmet from "react-helmet"
import Sidebar from "components/Sidebar"
import Header from "components/Header"
import Footer from "components/Footer"

const Root = styled("div")({
  display: "flex",
  height: "100vh",
})

const Drawer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
  },
}))

const AppContent = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
})

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.body.background,
  overflow: "auto",
}))

export type MainLayoutProps = PropsWithChildren<WithWidthProps>

const MainLayout: FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children, width = "xs" } = props

  const pad = isWidthUp("lg", width) ? 4 : 2

  return (
    <Root>
      <Helmet title="Seek your Sport" />
      <Drawer>
        <Hidden mdUp implementation="js">
          <Sidebar />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar />
        </Hidden>
      </Drawer>
      <AppContent>
        <Header />
        <MainContent p={pad}>{children}</MainContent>
        <Footer />
      </AppContent>
    </Root>
  )
}

export type MainLayoutType = FC<MainLayoutProps>

export default withWidth()(MainLayout)
