import React from "react"
import { makeStyles, styled, Theme } from "@material-ui/core/styles"
import { NavLink } from "react-router-dom"
import {
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Hidden,
  Typography,
  Badge,
} from "@material-ui/core"
import {
  ExitToApp,
  Menu,
  AccountCircle,
  Notifications,
} from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { openSideBar } from "redux/reducers/ui/uiSlice"
import {
  logout,
  selectUserId,
  selectUserType,
} from "redux/reducers/auth/authSlice"
import { fetchUserById, selectUser } from "redux/reducers/user/userSlice"
import { getUserName } from "utils/stringUtils"

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}))

const Filler = styled("div")({
  flexGrow: 1,
})

const Header = styled(AppBar)(({ theme }) => ({
  minHeight: theme.header.height,
  background: theme.header.background,
  zIndex: theme.zIndex.drawer + 1,
  padding: "0 !important",
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: theme.header.height,
}))

const HeaderFC = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const signout = () => {
    dispatch(logout())
  }

  const id = useAppSelector(selectUserId)
  const type = useAppSelector(selectUserType)
  const user = useAppSelector(selectUser)

  const name = getUserName(user)

  React.useEffect(() => {
    dispatch(fetchUserById({ id, type }))
  }, [dispatch, id, type])

  return (
    <>
      <Header position="fixed">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(openSideBar())}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap>
            SportSeek
          </Typography>
          <Filler />
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton aria-label="user pic" color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton
            className={classes.title}
            aria-label="user name"
            color="inherit"
          >
            <Typography variant="h6" noWrap>
              {name}
            </Typography>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="logout"
            aria-haspopup="true"
            color="inherit"
            onClick={signout}
            component={NavLink}
            to="/signin"
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </Header>
      <Toolbar />
    </>
  )
}

export default HeaderFC
