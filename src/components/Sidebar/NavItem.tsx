import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon ,
} from "@material-ui/core"
import React, { FC } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { NavLink, useLocation, matchPath } from "react-router-dom"

type NavItemProps = {
  text: string
  path: string
  icon: typeof SvgIcon
}

const useStyles = makeStyles((theme) => ({
  focus: {
    "&:active": {
      backgroundColor: theme.palette.primary
    }
  },
}))

const NavItemFC: FC<NavItemProps> = (props: NavItemProps) => {
  const classes = useStyles()
  const { text, path: href, icon: Icon } = props
  const location = useLocation()
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
        exact: true,
      })
    : false
    console.log(active)
  return (
    <ListItem button component={NavLink} to={href} className={classes.focus}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default NavItemFC
