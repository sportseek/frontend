import React from "react"

import { styled, useTheme } from "@material-ui/core/styles"
import { Typography, useMediaQuery } from "@material-ui/core"
import Helmet from "react-helmet"

const Dummy = styled("div")(() => ({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  flex: 1,
  flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
}))

const DummyPage = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))
  const variant = matches ? "h2" : "h1"
  return (
    <Dummy>
      <Helmet title="SportSeek" />
      <Typography variant={variant}> To be implemented in Future</Typography>
    </Dummy>
  )
}

export default DummyPage
