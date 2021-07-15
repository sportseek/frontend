import React, { FormEvent, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import { InputLabel, Select, MenuItem } from "@material-ui/core"
import IArenaOwner, { ArenaEvent } from "types/ArenaOwner"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { selectLoggedInUser, updateUser } from "redux/reducers/user/userSlice"
import { CreateEventPayload } from "types"

const useStyles = makeStyles({
  UpdateArenaDialog: {
    padding: "32px",
  },
  eventInputs: {
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    marginTop: "16px",
    width: "100%",
  },
  eventTime: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventParticipants: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogBtn: {
    marginTop: "24px",
  },
})

export interface UpdateArenaDialogProps {
  open: boolean
  onClose: () => void
  isUpdate: boolean
  arenaDetails: IArenaOwner
}

const sportTypes = [
  {
    id: "football",
    name: "Football",
  },
  {
    id: "cricket",
    name: "Cricket",
  },
]

const UpdateArenaDialog = (props: UpdateArenaDialogProps) => {
  const classes = useStyles()
  const { onClose, open, isUpdate, arenaDetails } = props
  const user = useAppSelector(selectLoggedInUser) as IArenaOwner
  const dispatch = useAppDispatch()

  const [arenaName, setArenaName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (isUpdate && arenaDetails) {
      setArenaName(arenaDetails.arenaName)
      setEmail(arenaDetails.email)
      setPhone(arenaDetails.phone)
    }
  }, [arenaDetails, isUpdate, user])

  const handleClose = () => {
    onClose()
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "arenaName") setArenaName(value)
    if (name === "email") setEmail(value)
    if (name === "phone") setPhone(value)
    if (name === "password") setPassword(value)
  }

  const handleUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedUser = { ...user }
    updatedUser.arenaName = arenaName
    updatedUser.email = email
    updatedUser.phone = phone
    dispatch(updateUser(updatedUser))
    handleClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.UpdateArenaDialog}>
        <DialogTitle id="simple-dialog-title">Update Arena Profile</DialogTitle>
        <div className={classes.eventInputs}>
          <form onSubmit={handleUpdateUser}>
            <TextField
              autoComplete="title"
              name="arenaName"
              variant="outlined"
              required
              fullWidth
              id="arenaName"
              label="Event Title"
              value={arenaName}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            <TextField
              autoComplete="title"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            <TextField
              autoComplete="title"
              name="phone"
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone"
              value={phone}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            {/* <TextField
              autoComplete="title"
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="New Password"
              type="password"
              value={password}
              onChange={handleInputChange}
              className={classes.formInput}
            /> */}

            <div className={classes.dialogBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.dialogBtn}
              >
                Update Profile
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="button"
                className={classes.dialogBtn}
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateArenaDialog
