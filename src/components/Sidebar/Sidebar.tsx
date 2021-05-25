import React, { FC } from "react"
import clsx from "clsx"
import { makeStyles, styled } from "@material-ui/core/styles"
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  Typography,
  Button,
} from "@material-ui/core"
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { closeSideBar, openSideBar } from "redux/reducers/sidebar/sidebarSlice"
import { RootState } from "redux/store"

import { PageDataType, getPages } from "pages"
import NavItem from "./NavItem"

const Filler = styled("div")({
  flexGrow: 1,
})

const Slider = styled(Button)({
  textTransform: "none",
})

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.sidebar.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    overflow: "hidden",
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

type SidebarProps = {
  variant: "permanent" | "temporary" | "persistent" | undefined
}

const SideBar: FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles()
  const { variant } = props
  const open = useAppSelector((state: RootState) => state.sidebar.open)
  const userType = useAppSelector((state: RootState) => state.user.type)
  const pages: PageDataType[] = getPages(userType)
  const dispatch = useAppDispatch()
  const SliderIcon = open ? LeftIcon : RightIcon
  const toggleDrawer = () =>
    open ? dispatch(closeSideBar()) : dispatch(openSideBar())
  return (
    <Drawer
      variant={variant}
      open={open}
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
      onClose={() => dispatch(closeSideBar())}
    >
      <Toolbar />
      <List>
        {pages.map(({ path, header, icon }) => (
          <NavItem key={path} path={path} text={header} icon={icon} />
        ))}
      </List>

      <Filler />
      <Divider />

      <Slider
        variant="contained"
        onClick={toggleDrawer}
        color="default"
        startIcon={<SliderIcon />}
      >
        {open && <Typography variant="body2">Collapse Sidebar</Typography>}
      </Slider>
    </Drawer>
  )
}

export default SideBar
