/* eslint-disable react/no-array-index-key */
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import { useAppSelector } from "redux/hooks"
import UserAPI from "redux/reducers/user/userAPI"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPlayer } from "types"
import Tooltip from "components/Common/Tooltip"
import AddFriendDialog, { FrdDetails } from "./AddFriendDialog"
import RemoveFriendDialog from "./RemoveFriendDialog"

const useStyles = makeStyles((theme) => ({
  simpleCard: {
    heigth: "100%",
    width: "100%",
  },
  content: {
    height: "100%",
  },
  root: {
    display: "flex",
    margin: "auto",
    height: "100%",
    "& > *": {
      margin: theme.spacing(1),
      marginBottom: -1,
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

type Props = {
  list: FrdDetails[]
}

const FriendList = (props: Props) => {
  const { list = [] } = props
  const classes = useStyles()
  return (
    <>
      {list.length > 0
        ? list.map((item, index) => (
            <Tooltip
              key={`${item.email} ${index}`}
              title={item.name}
              placement="top"
            >
              {item.imageURL ? (
                <Avatar alt={item.name} src={item.imageURL} />
              ) : (
                <Avatar alt={item.name} className={classes.avatar}>
                  {item.name[0]}
                </Avatar>
              )}
            </Tooltip>
          ))
        : null}
    </>
  )
}

const Friends = () => {
  const classes = useStyles()

  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const { friends = [] } = player

  const [list, setList] = React.useState<FrdDetails[]>([])

  const [open, setOpen] = React.useState(false)
  const [openR, setOpenR] = React.useState(false)

  React.useEffect(() => {
    let running = true

    const fetchFriendList = async (ids: string[]) => {
      const promises = ids.map((id) => UserAPI.findFriend(id))
      const result = (await Promise.all(promises)) as FrdDetails[]

      if (running) setList(result)
    }
    if (friends.length > 0) fetchFriendList(friends)

    return () => {
      running = false
      setList([])
    }
  }, [friends])

  const handleClickAdd = () => {
    setOpen(true)
  }

  const handleCloseAdd = () => {
    setOpen(false)
  }

  const handleClickRemove = () => {
    setOpenR(true)
  }

  const handleCloseRemove = () => {
    setOpenR(false)
  }

  return (
    <Card className={classes.simpleCard} raised>
      <CardHeader
        title="Friends"
        action={
          <>
            <Tooltip title="Add" placement="left">
              <IconButton
                color="primary"
                aria-label="add friend"
                onClick={handleClickAdd}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove" placement="bottom">
              <span>
                <IconButton
                  color="primary"
                  aria-label="remove friend"
                  disabled={list.length === 0}
                  onClick={handleClickRemove}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </span>
            </Tooltip>
          </>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.root}>
          <FriendList list={list} />
        </div>
        <AddFriendDialog open={open} handleClose={handleCloseAdd} />
        <RemoveFriendDialog
          open={openR}
          friends={list}
          handleClose={handleCloseRemove}
        />
      </CardContent>
    </Card>
  )
}

export default Friends
