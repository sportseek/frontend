import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@material-ui/core"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import React, { FC } from "react"
import { useAppDispatch } from "redux/hooks"
import { NavLink, useLocation, matchPath } from "react-router-dom"
import Tooltip from "components/Common/Tooltip"
import { clearEventDetails } from "redux/reducers/event/eventSlice"

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
  },
  activeicon: {
    color: theme.palette.secondary.main,
  },
  activetext: {
    color: theme.palette.secondary.main,
  },
}))

type NavItemProps = {
  text: string
  path: string
  icon: typeof SvgIcon
  showTooltip?: boolean
}

const NavItemFC: FC<NavItemProps> = (props: NavItemProps) => {
  const { text, path: href, icon: Icon, showTooltip } = props
  const classes = useStyles()
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
        <ListItemIcon
          className={clsx(classes.icon, {
            [classes.activeicon]: active,
          })}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={text}
          className={clsx(classes.text, {
            [classes.activetext]: active,
          })}
        />
      </ListItem>
    </Tooltip>
  )
}

NavItemFC.defaultProps = {
  showTooltip: false,
}

export default NavItemFC
