/* eslint-disable react/no-array-index-key */
import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
//import AddCircleIcon from "@material-ui/icons/AddCircle"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import { useAppSelector } from "redux/hooks"
import UserAPI from "redux/reducers/user/userAPI"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPlayer } from "types"
import Tooltip from "components/Common/Tooltip"
import AddFriendDialog, { FrdDetails } from "../PlayerFriends/AddFriendDialog"
import RemoveFriendDialog from "../PlayerFriends/RemoveFriendDialog"
import InviteFriendDialog from "./EventInviteFriendDialog"

import { Button } from "@material-ui/core"
import MuiButton from "@material-ui/core/Button"
import PeopleIcon from "@material-ui/icons/People"

// const Button = withStyles({
//   root: {
//     "&.Mui-disabled": {
//       pointerEvents: "auto"
//     }
//   }
// })(MuiButton);

// const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...other }) => {
//   const adjustedButtonProps = {
//     disabled: disabled,
//     component: disabled ? "div" : undefined,
//     onClick: disabled ? undefined : onClick,
//   }
//   return (
//     <Tooltip title={tooltipText}>
//       <Button {...other} {...adjustedButtonProps} />
//     </Tooltip>
//   )
// }

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
  invite: {
    background: "linear-gradient(45deg, #11f29c, #11cf00)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 40px",
  },
  inviteDisabled: {
    background: "linear-gradient(45deg, #737573, #737573)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 40px",
  },
}))

type Props = {
  list: FrdDetails[]
}

const FriendList = (props: Props) => {
  const { list = [] } = props

  return (
    <>
      {list.length > 0
        ? list.map((item, index) => (
            <Tooltip
              key={`${item.email} ${index}`}
              title={item.name}
              placement="top"
            >
              <Avatar alt={item.name} src={item.imageURL}>
                {item.name[0]}
              </Avatar>
            </Tooltip>
          ))
        : null}
    </>
  )
}

type PropsComp = {
  registered: boolean
}

const EventInvite: React.FC<PropsComp> = ({ registered: registered }) => {
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

  const handleClickRemove = () => {
    setOpenR(true)
  }

  const handleCloseRemove = () => {
    setOpenR(false)
  }

  return (
    <div>
      {registered ? (
        <div>
          <Tooltip title="You can invite if you have added friends and registered for the event">
            <Button
              startIcon={<PeopleIcon />}
              disabled={!registered || list.length === 0}
              onClick={handleClickRemove}
              className={classes.invite}
            >
              Invite Friends
            </Button>
          </Tooltip>
          <InviteFriendDialog
            open={openR}
            friends={list}
            handleClose={handleCloseRemove}
          />
        </div>
      ) : (
        <div>
          <Tooltip title="You can invite if you have added friends and registered for the event">
            <Button
              startIcon={<PeopleIcon />}
              className={classes.inviteDisabled}
            >
              Invite Friends
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default EventInvite
