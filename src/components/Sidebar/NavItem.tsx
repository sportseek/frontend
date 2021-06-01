import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@material-ui/core"
import React, { FC } from "react"
import { NavLink, useLocation, matchPath } from "react-router-dom"

type NavItemProps = {
  text: string
  path: string
  icon: typeof SvgIcon
}

const NavItemFC: FC<NavItemProps> = (props: NavItemProps) => {
  const { text, path: href, icon: Icon } = props
  const location = useLocation()
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
        exact: true,
      })
    : false
  return (
    <ListItem button component={NavLink} to={href} selected={active}>
      <ListItemIcon>
        <Icon color="secondary" />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default NavItemFC
