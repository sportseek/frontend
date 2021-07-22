import React, { useEffect } from "react"
import clsx from "clsx"
import { makeStyles, styled, useTheme } from "@material-ui/core/styles"
import {
  Drawer,
  Hidden,
  Toolbar,
  List,
  Typography,
  Button,
  withWidth,
  WithWidthProps,
} from "@material-ui/core"
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  closeSideBar,
  openSideBar,
  openSideBarMobile,
  closeSideBarMobile,
  selectOpenSideBar,
  selectOpenSideBarMobile,
} from "redux/reducers/ui/uiSlice"
import { selectUserType } from "redux/reducers/auth/authSlice"
import { PageDataType, getPages } from "pages"
import { BUTTON_SLIDER } from "utils/constants"
import Tooltip from "components/Common/Tooltip"
import sidebarBG from "assets/sidebarBG.png"

import NavItem from "./NavItem"

const Root = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    flexShrink: 0,
  },
}))

const Filler = styled("div")({
  flexGrow: 1,
})

const Slider = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 0,
  height: theme.footer.height,
}))

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.sidebar.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    overflow: "hidden",
    paddingTop: theme.spacing(2),
    backgroundImage: `url(${sidebarBG})`,
    // backgroundImage: "url(https://source.unsplash.com/YGGXciK3oa8/1600x1200)",
  },
  drawerOpen: {
    width: theme.sidebar.width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
}))

const SideBar = (props: WithWidthProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const { width } = props
  const open = useAppSelector(selectOpenSideBar)
  const mobileOpen = useAppSelector(selectOpenSideBarMobile)
  const userType = useAppSelector(selectUserType)
  const pages: PageDataType[] = getPages(userType, true)
  const dispatch = useAppDispatch()
  const SliderIcon = open ? LeftIcon : RightIcon
  const toggleDrawer = () =>
    open ? dispatch(closeSideBar()) : dispatch(openSideBar())

  const toggleDrawerMobile = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    if (mobileOpen) dispatch(closeSideBarMobile())
    else dispatch(openSideBarMobile())
  }

  const container =
    window !== undefined ? () => window.document.body : undefined

  useEffect(() => {
    dispatch(closeSideBarMobile())
  }, [dispatch, width])

  return (
    <Root>
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={() => dispatch(closeSideBarMobile())}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: mobileOpen,
            [classes.drawerClose]: !mobileOpen,
          })}
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: mobileOpen,
              [classes.drawerClose]: !mobileOpen,
            }),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Toolbar />
          <div
            role="presentation"
            onClick={toggleDrawerMobile}
            onKeyDown={toggleDrawerMobile}
          >
            <List>
              {pages.map(({ path, header, icon }) => (
                <NavItem key={path} path={path} text={header} icon={icon} />
              ))}
            </List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          onClose={toggleDrawer}
          variant="permanent"
          open
        >
          <Toolbar />
          <List>
            {pages.map(({ path, header, icon }) => (
              <NavItem
                key={path}
                path={path}
                text={header}
                icon={icon}
                showTooltip={!open}
              />
            ))}
          </List>
          <Filler />
          <Tooltip title={open ? "" : "Open sidebar"}>
            <Slider
              variant="contained"
              onClick={toggleDrawer}
              color="secondary"
              startIcon={<SliderIcon />}
            >
              {open && <Typography variant="body2">{BUTTON_SLIDER}</Typography>}
            </Slider>
          </Tooltip>
        </Drawer>
      </Hidden>
    </Root>
  )
}

export default withWidth()(SideBar)
