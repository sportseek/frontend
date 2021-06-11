import React, { FC, PropsWithChildren } from "react"
import { styled } from "@material-ui/core/styles"
import { Toolbar as MuiToolbar } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import PerfectScrollbar from "react-perfect-scrollbar"
import Header from "components/Header"
import Sidebar from "components/Sidebar"
import Footer from "components/Footer"

const Root = styled("div")({
  display: "flex",
  height: "100vh",
})

const MainContent = styled("main")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "red",
})

const Page = styled("div")(({ theme }) => ({
  flexGrow: 1,
  background: theme.body.background,
  padding: theme.spacing(2),
  overflowY: "auto",
  overflowX: "hidden",
  height: "100%",
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: theme.header.height,
}))

type MainLayoutProps = PropsWithChildren<{}>

export default function MainLayoutView(props: MainLayoutProps) {
  const { children } = props

  return (
    <Root>
      <CssBaseline />
      <Header />
      <Sidebar />
      <MainContent>
        <Toolbar />
        <PerfectScrollbar>
          <Page>{children}</Page>
        </PerfectScrollbar>
        <Footer />
      </MainContent>
    </Root>
  )
}

export type MainLayoutType = FC<MainLayoutProps>
