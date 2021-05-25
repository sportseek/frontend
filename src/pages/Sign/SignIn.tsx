import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"

const SignInPage: FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  )
  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div>`Authentication needed`</div>
  )
}
export default SignInPage
