import { makeStyles } from "@material-ui/core/styles"
import React, { FC, useEffect } from "react"
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
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

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

  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (authStatus === AuthStatus.FAILED && authErrors === undefined)
      setOpen(true)
    else setOpen(false)
  }, [authErrors, authStatus])

  return isAuthenticated ? (
    <Redirect to={{ pathname: "/home" }} />
  ) : (
    <div className={classes.root}>
      <Helmet title="SportSeek - Sign in" />
      <div className={classes.signinWrapper}>
        {authStatus === AuthStatus.PROCESSING ? <LinearProgress /> : null}
        <SigninForm />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Please try again later!
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
export default SignInPage
