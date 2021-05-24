import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { PageDataType, getPages } from "pages"
import React from "react"
import { useAppSelector } from "redux/hooks"
import { RootState } from "redux/store"
import { NavLink } from "react-router-dom"

const ItemList = () => {
  const userType = useAppSelector((state: RootState) => state.user.type)

  const pages: PageDataType[] = getPages(userType)

  return (
    <>
      <List>
        {pages.map(({ icon: Icon, header, path }) => (
          <ListItem button key={header} component={NavLink} to={path}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={header} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  )

  return <div />
}

export default ItemList
