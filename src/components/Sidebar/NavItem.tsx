import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@material-ui/core"
import React, { FC } from "react"
import { useAppDispatch } from "redux/hooks"
import { NavLink, useLocation, matchPath } from "react-router-dom"
import Tooltip from "components/Common/Tooltip"
import { clearEventDetails } from "redux/reducers/event/eventSlice"

type NavItemProps = {
  text: string
  path: string
  icon: typeof SvgIcon
  showTooltip?: boolean
}

const NavItemFC: FC<NavItemProps> = (props: NavItemProps) => {
  const { text, path: href, icon: Icon, showTooltip } = props
  const location = useLocation()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(clearEventDetails())
  }
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
        exact: true,
      })
    : false
  return (
    <Tooltip
      title={showTooltip ? text : ""}
      aria-label={text}
      placement="right-end"
    >
      <ListItem
        button
        component={NavLink}
        to={href}
        selected={active}
        onClick={handleClick}
      >
        <ListItemIcon>
          <Icon color="secondary" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Tooltip>
  )
}

NavItemFC.defaultProps = {
  showTooltip: false,
}

export default NavItemFC
