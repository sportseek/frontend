import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import { isIfAuthenticated } from "redux/reducers/auth/authSlice"

const SignInPage: FC = () => {
  const isAuthenticated = useAppSelector(isIfAuthenticated)
  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div>`Authentication needed`</div>
  )
}
export default SignInPage
