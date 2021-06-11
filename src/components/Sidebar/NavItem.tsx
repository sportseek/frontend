import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@material-ui/core"
import React, { FC } from "react"
import { NavLink, useLocation, matchPath } from "react-router-dom"
import Tooltip from "components/Common/Tooltip"

type NavItemProps = {
  text: string
  path: string
  icon: typeof SvgIcon
  showTooltip?: boolean
}

const NavItemFC: FC<NavItemProps> = (props: NavItemProps) => {
  const { text, path: href, icon: Icon, showTooltip } = props
  const location = useLocation()
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
        exact: true,
      })
    : false
  return showTooltip ? (
    <Tooltip title={text} aria-label={text} placement="right-end">
      <ListItem button component={NavLink} to={href} selected={active}>
        <ListItemIcon>
          <Icon color="secondary" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Tooltip>
  ) : (
    <ListItem button component={NavLink} to={href} selected={active}>
      <ListItemIcon>
        <Icon color="secondary" />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

NavItemFC.defaultProps = {
  showTooltip: false,
}

export default NavItemFC
