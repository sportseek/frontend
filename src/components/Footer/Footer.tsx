import { Typography } from "@material-ui/core"
import React from "react"
import { styled } from "@material-ui/core/styles"
import { Copyright } from "@material-ui/icons"

import { COPYRIGHT_INFO } from "utils/constants"

const Footer = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  background: theme.footer.background,
  minHeight: theme.footer.height,
}))

const FooterFC = () => {
  const year = new Date().getFullYear()
  const footerText = `${year} ${COPYRIGHT_INFO}`
  return (
    <Footer>
      <Copyright />
      &nbsp;
      <Typography variant="caption">{footerText}</Typography>
    </Footer>
  )
}

export default FooterFC
