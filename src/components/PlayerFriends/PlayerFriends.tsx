import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useAppSelector } from "redux/hooks"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPlayer } from "types"
import Tooltip from "components/Common/Tooltip"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "auto",
    "& > *": {
      margin: theme.spacing(1),
      marginBottom: 0,
    },
  },
}))

const Friends = () => {
  const classes = useStyles()

  const player = useAppSelector(selectLoggedInUser) as IPlayer

  return (
    <Card>
      <CardHeader title="Friends" action={
          <>
          <Tooltip title="Add" placement="left">
            <IconButton
              color="secondary"
              aria-label="add friend"
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove" placement="bottom">
          <IconButton
            color="secondary"
            aria-label="remove friend"
          >
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
        </>
        } />
      <CardContent>
        <div className={classes.root}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </div>
      </CardContent>
    </Card>
  )
}

export default Friends
