import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { SlotInfo } from "react-big-calendar"
import { PEventPayload } from "types"
import {
  createPEvent,
  selectErrors,
  selectHasErrors,
  prepareForValidation,
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

  const [pEvent, setPEvent] = useState<PEventPayload>({
    title: "",
    creator: userId,
    description: "",
    start: "",
    end: "",
  })

  const validationErrors = useAppSelector(selectErrors)
  const hasErrors = useAppSelector(selectHasErrors)

  React.useEffect(() => {
    setPEvent((p) => ({
      ...p,
      start: moment(start).toISOString(),
      end: moment(end).toISOString(),
    }))
  }, [start, end])

  const handleFormClose = useCallback(() => {
    dispatch(prepareForValidation())
    handleClose()
  }, [dispatch, handleClose])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPEvent({
      ...pEvent,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (!hasErrors) {
      goBack()
      handleFormClose()
    }
  }, [dispatch, goBack, handleFormClose, hasErrors])

  const handleCreate = () => dispatch(createPEvent(pEvent))

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
            error={!!validationErrors.title}
            margin="normal"
            id="personal event title"
            label="Title"
            name="title"
            fullWidth
            value={pEvent.title}
            onChange={handleChange}
            helperText={validationErrors.title}
          />
          <TextField
            margin="normal"
            id="personal event description"
            label="Description"
            name="description"
            fullWidth
            value={pEvent.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="primary">
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