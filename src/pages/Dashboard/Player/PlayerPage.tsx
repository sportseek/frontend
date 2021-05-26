import React, { FC } from "react"
import { styled } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import PlayerList from "components/PlayerList"
import PlayerDetails from "components/PlayerDetails"
import Wallet from "components/Wallet"

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
}))

const FirstColumn = styled(Grid)({})

const SecondColumn = styled(Grid)({})

const SignInPage: FC = () => {
  console.log()
  return <Root />
}
export default SignInPage
