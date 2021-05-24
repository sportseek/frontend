/** @jsxImportSource theme-ui */
import React, { FC } from "react"
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom"
import { Button, SvgIcon, ListItem } from "@material-ui/core"

type NavItemProps = {
  href: string
  icon: typeof SvgIcon
  title: string
}

const NavItem: FC<NavItemProps> = (props: NavItemProps) => {
  const location = useLocation()
  const { href, icon: Icon, title } = props
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
      })
    : false

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
    >
      <Button
        component={RouterLink}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: "primary.main",
          }),
          "& svg": {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon style={{ fontSize: 20 }} />}
        <span>{title}</span>
      </Button>
    </ListItem>
  )
}

export default NavItem
