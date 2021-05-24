import React from "react"
import { makeStyles, styled, Theme } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
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
import { useAppDispatch } from "redux/hooks"
import { openSideBar } from "redux/reducers/sidebar/sidebarSlice"

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
  height: theme.header.height,
  background: theme.header.background,
  zIndex: theme.zIndex.drawer + 1,
}))

const HeaderFC = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()

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
              Jhon Dee
            </Typography>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="logout"
            aria-haspopup="true"
            color="inherit"
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
