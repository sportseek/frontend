import { makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC } from "react"
import { Redirect } from "react-router-dom"
import { useAppSelector } from "redux/hooks"
import { isIfAuthenticated } from "redux/reducers/auth/authSlice"
import Signin from "../../components/Signin"

const useStyles = makeStyles((theme: Theme) => ({
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

  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div className={classes.root}>
      <div className={classes.signinWrapper}>
        <Signin />
      </div>
    </div>
  )
}
export default SignInPage
