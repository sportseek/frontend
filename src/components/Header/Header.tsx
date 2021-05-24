import React, { FC } from "react"
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
  MenuOpen,
  AccountCircle,
  Notifications,
} from "@material-ui/icons"

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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}))

const Filler = styled("div")({
  flexGrow: 1,
})

const Header = styled(AppBar)(({ theme }) => ({
  height: theme.header.height,
  background: theme.header.background,
}))

type HeaderProps = {
  onDrawerToggle: () => void
}

const HeaderFC: FC<HeaderProps> = (props: HeaderProps) => {
  const classes = useStyles()

  const { onDrawerToggle } = props

  return (
    <Header position="sticky">
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerToggle}
          >
            <MenuOpen />
          </IconButton>
        </Hidden>
        <Typography className={classes.title} variant="h6" noWrap>
          SportSeek
        </Typography>
        <Filler />
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton aria-label="user pic" color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton aria-label="user name" color="inherit">
            <Typography className={classes.title} variant="h6" noWrap>
              Jhon Dee
            </Typography>
          </IconButton>
        </div>
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
  )
}

export default HeaderFC
