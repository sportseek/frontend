import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import { useAppSelector } from "redux/hooks"
import {
  AuthStatus,
  isIfAuthenticated,
  selectAuthErrors,
  selectAuthStatus,
} from "redux/reducers/auth/authSlice"
import SignInSide from "components/SigninForm/SigninFormSide"
import ErrorBar from "components/Common/Errorbar"

const SignInPage: FC = () => {
  const isAuthenticated = useAppSelector(isIfAuthenticated)
  const authStatus = useAppSelector(selectAuthStatus)
  const authErrors = useAppSelector(selectAuthErrors)

  const showErrorBar =
    authStatus === AuthStatus.FAILED && authErrors instanceof Array

  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div>
      <Helmet title="SportSeek - Sign in" />
      <SignInSide />
      {showErrorBar && <ErrorBar errors={authErrors as []} />}
    </div>
  )
}
export default SignInPage
