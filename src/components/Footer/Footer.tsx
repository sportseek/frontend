import { Divider, Typography } from "@material-ui/core"
import React from "react"
import { styled } from "@material-ui/core/styles"
import { Copyright } from "@material-ui/icons"

import { COMPANY_NAME, COPYRIGHT_INFO } from "utils/constants"

const Footer = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  background: theme.footer.background,
  minHeight: theme.footer.height,
  zIndex: 700,
  width: "100%",
}))

const FooterFC = () => {
  const year = new Date().getFullYear()
  return (
    <Footer>
      <Divider />
      <Copyright fontSize="small" />
      &nbsp;
      <Typography variant="body1">{year}</Typography>
      &nbsp;
      <Typography variant="body1" color="primary">
        {COMPANY_NAME}
      </Typography>
      &nbsp;
      <Typography variant="body1">{COPYRIGHT_INFO}</Typography>
    </Footer>
  )
}

export default FooterFC
