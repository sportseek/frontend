import { makeStyles } from "@material-ui/core"
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getNotifications,
  readNotification,
  selectUserNotification,
} from "redux/reducers/user/userSlice"
import { Notifications } from "@material-ui/icons"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import Tooltip from "components/Common/Tooltip"
import { INotification } from "types/Notification"
import MarkunreadIcon from "@material-ui/icons/Markunread"
import DraftsIcon from "@material-ui/icons/Drafts"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(() => ({
  notificationMenu: {
    overflow: "auto",
    maxHeight: "200px",
  },
  notificationItem: {
    display: "flex",
    whiteSpace: "pre-wrap",
  },
  loadMoreNotificationBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  noNotifications: {
    padding: "16px",
  },
}))

const Notification = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const userNotifications = useAppSelector(selectUserNotification)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [unreadNotification, setUnreadNotification] = useState(0)

  const history = useHistory()

  useEffect(() => {
    dispatch(getNotifications(pageNumber))
  }, [dispatch, pageNumber])

  useEffect(() => {
    const unreadCount = userNotifications.filter(
      (item) => item.unreadStatus === true
    ).length
    setUnreadNotification(unreadCount)
  }, [userNotifications])
  const openNotificationMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeNotificationMenu = () => {
    setAnchorEl(null)
  }

  const gotoEventDetails = (id: string) => {
    const href = `/eventdetails/${id}`
    history.push(href)
  }

  const handleReadNotification = (notification: INotification) => {
    // readNotification(notificationId, pageNumber);
    gotoEventDetails(notification.eventId)
    dispatch(readNotification({ notificationId: notification._id, pageNumber }))
    closeNotificationMenu()
  }

  const loadMoreNotifications = () => {
    dispatch(getNotifications(pageNumber + 1))
    setPageNumber(pageNumber + 1)
  }

  return (
    <div>
      <Tooltip title="Toggle notifications panel">
        <IconButton
          aria-label="notifications"
          color="inherit"
          onClick={openNotificationMenu}
        >
          <Badge badgeContent={unreadNotification} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeNotificationMenu}
        elevation={0}
      >
        {userNotifications.length > 0 && (
          <div className={classes.notificationMenu}>
            {userNotifications.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() => handleReadNotification(item)}
              >
                <div className={classes.notificationItem}>
                  {" "}
                  {item.unreadStatus && (
                    <MarkunreadIcon style={{ marginRight: "8px" }} />
                  )}
                  {!item.unreadStatus && (
                    <DraftsIcon style={{ marginRight: "8px" }} />
                  )}{" "}
                  {item.description}
                </div>
              </MenuItem>
            ))}
            <div className={classes.loadMoreNotificationBtn}>
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreNotifications}
              >
                Load more
              </Button>
            </div>
          </div>
        )}
        {userNotifications.length === 0 && (
          <div className={classes.noNotifications}>
            You currently do not have any notifications
          </div>
        )}
      </Menu>
    </div>
  )
}

export default Notification
