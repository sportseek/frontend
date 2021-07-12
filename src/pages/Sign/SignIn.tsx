import { makeStyles } from "@material-ui/core/styles"
import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import LinearProgress from "@material-ui/core/LinearProgress"
import Helmet from "react-helmet"
import { useAppSelector } from "redux/hooks"
import {
  AuthStatus,
  isIfAuthenticated,
  selectAuthErrors,
  selectAuthStatus,
} from "redux/reducers/auth/authSlice"
import SigninForm from "components/SigninForm"
import SignInSide from "components/SigninForm/SigninFormSide"
import ErrorBar from "components/Common/Errorbar"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  signinWrapper: {
    border: "1px solid black",
    marginTop: "32px",
  },
}))

const SignInPage: FC = () => {
  const classes = useStyles()
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
      <div>
        {authStatus === AuthStatus.PROCESSING ? <LinearProgress /> : null}
        <SignInSide />
      </div>
      {showErrorBar && <ErrorBar errors={authErrors as []} />}
    </div>
    // <div className={classes.root}>
    //   <Helmet title="SportSeek - Sign in" />
    //   <div className={classes.signinWrapper}>
    //     {authStatus === AuthStatus.PROCESSING ? <LinearProgress /> : null}
    //     <SignInSide />
    //   </div>
    //   {showErrorBar && <ErrorBar errors={authErrors as []} />}
    // </div>
  )
}
export default SignInPage
