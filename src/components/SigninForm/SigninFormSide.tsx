import React, { FormEvent, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"

import Link from "@material-ui/core/Link"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Footer from "components/Footer"
import {
  userSignIn,
  selectAuthErrors,
  selectAuthStatus,
  AuthStatus,
} from "redux/reducers/auth/authSlice"
import { useAppDispatch, useAppSelector } from "redux/hooks"

export interface UserSigninPayload {
  email: string
  password: string
}

const useStyles = makeStyles((theme) => ({
  filler: {
    flexGrow: 1,
  },
  image: {
    height: "100vh",
    backgroundImage:
      "url(https://source.unsplash.com/collection/21649636/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signin: {
    height: "100vh",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  paper: {
    flex: 1,
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarCircle: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignInSide() {
  const classes = useStyles()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const authStatus = useAppSelector(selectAuthStatus)
  const authErrors = useAppSelector(selectAuthErrors) as UserSigninPayload

  const dispatch = useAppDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    if (name === "email") setEmail(value)
    if (name === "password") setPassword(value)
  }

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: UserSigninPayload = {
      email,
      password,
    }

    dispatch(userSignIn(payload))
  }

  return (
    <Grid container>
      <CssBaseline />
      <Grid item xs sm md className={classes.image} />
      <Grid item xs={12} sm={8} md={3} className={classes.signin}>
        <div className={classes.paper}>
          {authStatus === AuthStatus.PROCESSING ? (
            <Avatar className={classes.avatarCircle}>
              <CircularProgress color="secondary" />
            </Avatar>
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSignup}>
            <TextField
              variant="outlined"
              margin="normal"
              error={!!authErrors?.email}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              helperText={authErrors?.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={!!authErrors?.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              helperText={authErrors?.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Footer />
      </Grid>
    </Grid>
  )
}
