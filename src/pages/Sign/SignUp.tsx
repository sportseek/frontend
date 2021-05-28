import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import PlayerSignup from "components/PlayerSignup"
import { isIfAuthenticated } from "redux/reducers/auth/authSlice"

const SignUpPage: FC = () => {
  const isAuthenticated = useAppSelector(isIfAuthenticated)
  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <PlayerSignup />
  )
}

export default SignUpPage
