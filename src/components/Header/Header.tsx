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
import { deepOrange } from "@material-ui/core/colors"
import NotificationComponent from "components/Notification"

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
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
        <Typography variant="h6" noWrap>
          SportSeek
        </Typography>
        <Filler />
        {/* <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <Notifications />
          </Badge>
        </IconButton> */}
        <NotificationComponent />
        <IconButton disabled>
          <Avatar alt={name} src={profileImageUrl} className={classes.orange}>
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
