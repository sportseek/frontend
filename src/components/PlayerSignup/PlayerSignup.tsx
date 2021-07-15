import React, { FormEvent, useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { playerSignup, selectAuthErrors } from "redux/reducers/auth/authSlice"

export interface PlayerSignupPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const PlayerSignup = () => {
  const classes = useStyles()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [phone, setPhone] = useState("")

  const dispatch = useAppDispatch()

  const authErrors = useAppSelector(selectAuthErrors) as PlayerSignupPayload

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    if (name === "firstName") setFirstName(value)
    if (name === "lastName") setLastName(value)
    if (name === "playerEmail") setPlayerEmail(value)
    if (name === "password") setPassword(value)
    if (name === "phone") setPhone(value)
  }

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: PlayerSignupPayload = {
      firstName,
      lastName,
      email: playerEmail,
      password,
      phone,
    }

    dispatch(playerSignup(payload))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!authErrors?.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
                helperText={authErrors?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!authErrors?.lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInputChange}
                helperText={authErrors?.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!authErrors?.email}
                variant="outlined"
                required
                fullWidth
                id="playerEmail"
                label="Email Address"
                name="playerEmail"
                autoComplete="email"
                onChange={handleInputChange}
                helperText={authErrors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!authErrors?.password}
                variant="outlined"
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
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={handleInputChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                error={!!authErrors?.phone}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                onChange={handleInputChange}
                helperText={authErrors?.phone}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>{/* <Copyright /> */}</Box>
    </Container>
  )
}

export default PlayerSignup
