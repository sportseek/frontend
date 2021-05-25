import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import PlayerSignup from "../../components/PlayerSignup"

const SignUpPage: FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  )
  console.log(isAuthenticated)
  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <PlayerSignup />
  )
}

export default SignUpPage
