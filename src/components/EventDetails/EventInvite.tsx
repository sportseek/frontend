/* eslint-disable react/no-array-index-key */
import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import UserAPI from "redux/reducers/user/userAPI"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPlayer } from "types"
import Tooltip from "components/Common/Tooltip"

import { Button } from "@material-ui/core"
import PeopleIcon from "@material-ui/icons/People"
import {
  getAllPEvents,
  selectInviteEvents,
} from "redux/reducers/pEvent/pEventSlice"
import { selectCurrentEvent } from "redux/reducers/event/eventSlice"

import { FrdDetails } from "../PlayerFriends/AddFriendDialog"
import InviteFriendDialog from "./EventInviteFriendDialog"
import { withStyles } from "@material-ui/styles"

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    border: 0,
    borderRadius: 15,
    color: "white",
    width: "200px",
    padding: "15px 40px",
    backgroundImage:
      "linear-gradient(to right, #1D976C 0%, #93F9B9  51%, #1D976C  100%)",
    transition: "0.5s",
    backgroundSize: "200% auto",
    //background: "linear-gradient(45deg, #11f29c, #11cf00)",
    "&:hover": {
      backgroundPosition: "right center",
      //background: "linear-gradient(45deg, #02e08b, #0fbd00)",
    },
  },
}))(Button)

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
    width: "200px",
    color: "white",
    padding: "15px 40px",
  },
}))

type PropsComp = {
  registered: boolean
}

const EventInvite: React.FC<PropsComp> = ({ registered: registered }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const player = useAppSelector(selectLoggedInUser) as IPlayer
  const currentEvent = useAppSelector(selectCurrentEvent)

  const { friends = [] } = player

  const [list, setList] = React.useState<FrdDetails[]>([])

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
      {registered && list.length > 0 ? (
        <div>
          <Tooltip title="You can invite if you have added friends and registered for the event">
            <ColorButton
              startIcon={<PeopleIcon />}
              onClick={handleClickRemove}
              variant="contained"
              disabled={
                currentEvent.status !== "active" ||
                currentEvent.registeredPlayers.length == currentEvent.maxPlayers
              }
            >
              Invite Friends
            </ColorButton>
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
            <span>
              <Button
                startIcon={<PeopleIcon />}
                className={classes.inviteDisabled}
                variant="contained"
                disabled
              >
                Invite Friends
              </Button>
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default EventInvite
