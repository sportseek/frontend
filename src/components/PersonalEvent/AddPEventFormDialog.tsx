import React, { ChangeEvent, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { SlotInfo } from "react-big-calendar"
import { PEventPayload } from "types"
import {
  createPEvent,
  selectErrors,
  selectHasErrors,
} from "redux/reducers/pEvent/pEventSlice"

type FormProps = {
  open: boolean
  userId: string
  slotInfo: SlotInfo
  goBack: () => void
  handleClose: () => void
}

const AddPersonalEventFormDialog = (props: FormProps) => {
  const {
    open,
    handleClose,
    goBack,
    slotInfo: { start, end },
    userId,
  } = props

  const dispatch = useAppDispatch()

  const [payload, setPayload] = useState<PEventPayload>({
    title: "",
    creator: userId,
  } as unknown as PEventPayload)

  const hasErrors = useAppSelector(selectHasErrors)
  const validationErrors = useAppSelector(selectErrors)

  const error = {} as PEventPayload

  if (hasErrors)
    Object.entries(validationErrors).forEach((entry) => {
      const [key, { message }] = entry
      error[key] = message
    })

  console.log(error)

  React.useEffect(() => {
    setPayload((p) => ({
      ...p,
      start: moment(start).toISOString(),
      end: moment(end).toISOString(),
    }))
  }, [start, end])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreate = () => {
    dispatch(createPEvent(payload))

    if (!hasErrors) {
      goBack()
      handleClose()
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-personal-event-form-dialog"
      >
        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Create a event, please enter the following data.
          </DialogContentText>
          <TextField
            required
            autoFocus
            error={!!error.title}
            margin="normal"
            id="personal event title"
            label="Title"
            name="title"
            fullWidth
            value={payload.title}
            onChange={handleChange}
            helperText={error.title}
          />
          <TextField
            margin="normal"
            id="personal event description"
            label="Description"
            name="description"
            fullWidth
            value={payload.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPersonalEventFormDialog
