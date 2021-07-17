import React from "react"
import { makeStyles, styled, Theme } from "@material-ui/core/styles"
import { NavLink } from "react-router-dom"
import {
  AppBar,
  Avatar,
  Toolbar as MuiToolbar,
  IconButton,
  Hidden,
  Typography,
} from "@material-ui/core"
import { ExitToApp, Menu } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { openSideBarMobile } from "redux/reducers/ui/uiSlice"
import { logout, selectUserType } from "redux/reducers/auth/authSlice"
import { clearEventDetails } from "redux/reducers/event/eventSlice"
import {
  fetchLoggedInUser,
  selectLoggedInUser,
} from "redux/reducers/user/userSlice"
import { getUserName } from "utils/stringUtils"
import Tooltip from "components/Common/Tooltip"
import NotificationComponent from "components/Notification"

import SSLogo from "assets/sslogo6.png"

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logo: {
    height: 60,
    width: 205,
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
    dispatch(clearEventDetails())
    dispatch(logout())
  }

  const type = useAppSelector(selectUserType)
  const user = useAppSelector(selectLoggedInUser)
  const { profileImageUrl } = user

  const name = getUserName(user)

  const firstLetterOfName = name ? name[0] : ""

  React.useEffect(() => {
    dispatch(fetchLoggedInUser())
  }, [dispatch, type])

  return (
    <Header position="fixed">
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(openSideBarMobile())}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Toolbar>
          <img src={SSLogo} alt="logo" className={classes.logo} />
        </Toolbar>
        <Filler />
        <IconButton disableRipple disableFocusRipple disableTouchRipple>
          <Avatar alt={name} src={profileImageUrl} className={classes.avatar}>
            {firstLetterOfName}
          </Avatar>
        </IconButton>
        <IconButton
          className={classes.title}
          aria-label="user name"
          color="inherit"
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
        </IconButton>
        <NotificationComponent />
        <Tooltip title="Log out" aria-label="logout">
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
        </Tooltip>
      </Toolbar>
    </Header>
  )
}

export default HeaderFC
