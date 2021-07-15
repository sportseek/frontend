import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import { useAppDispatch } from "redux/hooks"
import Avatar from "@material-ui/core/Avatar"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { removeFriend } from "redux/reducers/user/userSlice"
import Checkbox from "@material-ui/core/Checkbox"
import { FrdDetails } from "./AddFriendDialog"

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxHeight: 500,
    maxWidth: 360,
  },
})

type Props = {
  open: boolean
  handleClose: () => void
  friends: FrdDetails[]
}

export default function RemoveFriendDialog(props: Props) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { open: openDialog, handleClose, friends = [] } = props
  const [checked, setChecked] = React.useState<FrdDetails[]>([])

  const handleToggle = (value: FrdDetails) => () => {
    const currentIndex = checked.findIndex((item) => item.email === value.email)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleSave = () => {
    if (checked.length > 0) {
      const ids = checked.map((item) => item.id)
      dispatch(removeFriend(ids))
    }
    handleClose()
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="remove-friend-dialog-title"
    >
      <DialogTitle id="remove-friend-dialog-title">Remove Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To remove a friend, please select from the list below.
        </DialogContentText>
        <List dense className={classes.root}>
          {friends.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.email}`
            return (
              <ListItem key={value.email} button>
                <ListItemAvatar>
                  <Avatar alt={value.name} src={value.imageURL} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={
                      checked.findIndex(
                        (item) => item.email === value.email
                      ) !== -1
                    }
                    inputProps={{ "aria-labelledby": labelId }}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={checked.length === 0}
        >
          Remove
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
