import { makeStyles, Theme } from "@material-ui/core"
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
import { Link } from "react-router-dom"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"

const useStyles = makeStyles((theme: Theme) => ({
  notificationWrapper: {
    marginRight: "16px",
  },

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

  useEffect(() => {
    dispatch(getNotifications(pageNumber))
  }, [])

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

  const handleReadNotification = (notificationId: string) => {
    // readNotification(notificationId, pageNumber);
    dispatch(readNotification({ notificationId, pageNumber }))
    closeNotificationMenu()
  }

  const loadMoreNotifications = () => {
    dispatch(getNotifications(pageNumber + 1))
    setPageNumber(pageNumber + 1)
  }

  return (
    <div className={classes.notificationWrapper}>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={openNotificationMenu}
      >
        <Badge badgeContent={unreadNotification} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
      {/* <MyButton tip="notifications" onClick={openNotificationMenu}>
        <Badge badgeContent={user.unreadNotifications} color="secondary">
          <NotificationsIcon />
        </Badge>
      </MyButton> */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeNotificationMenu}
      >
        {userNotifications.length > 0 && (
          <div className={classes.notificationMenu}>
            {userNotifications.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() => handleReadNotification(item._id)}
                component={Link}
                to={`/home`}
              >
                <div className={classes.notificationItem}>
                  {" "}
                  {item.unreadStatus && (
                    <RadioButtonCheckedIcon style={{ marginRight: "8px" }} />
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
                {/* {ui.notificationLoading && (
                  <CircularProgress size={30} className="btn-loader" />
                )} */}
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