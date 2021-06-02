import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import ArenaSignup from "components/ArenaSignup"

const SignUpPageArena: FC = () => {
  // const isAuthenticated = useAppSelector(
  //   (state: RootState) => state.user.isAuthenticated
  // )
  // console.log(isAuthenticated)
  // return isAuthenticated ? (
  //   <Redirect to={{ pathname: "/home" }} />
  // ) : (
  //   <ArenaSignup />
  // )
  return <div></div>
}

export default SignUpPageArena
