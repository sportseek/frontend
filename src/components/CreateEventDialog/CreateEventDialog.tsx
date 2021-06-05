import React, { FormEvent, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import { InputLabel, Select, MenuItem } from "@material-ui/core"
import { ArenaEvent, CreateEventPayload } from "types/ArenaOwner"
import moment from "moment"

const useStyles = makeStyles({
  createEventDialog: {
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

export interface CreateEventDialogProps {
  open: boolean
  onClose: () => void
  isUpdate: boolean
  selectedEvent?: ArenaEvent
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

const CreateEventDialog = (props: CreateEventDialogProps) => {
  const classes = useStyles()
  const { onClose, open, isUpdate, selectedEvent } = props

  const [eventTitle, setEventTitle] = useState("")
  const [sportType, setSportType] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventStartTime, setEventStartTime] = useState(moment().format('YYYY-MM-DDTHH:MM'))
  const [eventEndTime, setEventEndTime] = useState(moment().format('YYYY-MM-DDTHH:MM'))
  const [entryFee, setEntryFee] = useState("")
  const [maximumParticipants, setMaximumParticipants] = useState("")
  const [minimumParticipants, setMinimumParticipants] = useState("")

  useEffect(() => {
    if (isUpdate && selectedEvent) {
      setEventTitle(selectedEvent.eventTitle)
      setSportType(selectedEvent.sportType)
      setEventDescription(selectedEvent.eventDescription)
      setEventStartTime(selectedEvent.eventStartTime)
      setEventEndTime(selectedEvent.eventEndTime)
      setEntryFee(selectedEvent.entryFee.toString())
      setMaximumParticipants(selectedEvent.maximumParticipants.toString())
      setMinimumParticipants(selectedEvent.minimumParticipants.toString())
    }
  }, [isUpdate])

  const handleClose = () => {
    onClose()
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "eventTitle") setEventTitle(value)
    if (name === "sportType") setSportType(value)
    if (name === "eventDescription") setEventDescription(value)
    if (name === "eventStartTime") setEventStartTime(value)
    if (name === "eventEndTime") setEventEndTime(value)
    if (name === "entryFee") setEntryFee(value)
    if (name === "maximumParticipants") setMaximumParticipants(value)
    if (name === "minimumParticipants") setMinimumParticipants(value)
  }

  const handleCreateEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: CreateEventPayload = {
      eventTitle: eventTitle,
      sportType: sportType,
      eventDescription: eventDescription,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      entryFee: +entryFee,
      maximumParticipants: +maximumParticipants,
      minimumParticipants: +minimumParticipants,
    }

    console.log(payload)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.createEventDialog}>
        <DialogTitle id="simple-dialog-title">
          {isUpdate ? "Update Event" : "Create Event"}
        </DialogTitle>
        <div className={classes.eventInputs}>
          <form onSubmit={handleCreateEvent}>
            <TextField
              autoComplete="title"
              name="eventTitle"
              variant="outlined"
              required
              fullWidth
              id="eventTitle"
              label="Event Title"
              value={eventTitle}
              onChange={handleInputChange}
              className={classes.formInput}
            />
            <InputLabel id="sportType" className={classes.formInput}>
              Sport Type
            </InputLabel>
            <Select
              labelId="sportType"
              id="sportType"
              name="sportType"
              value={sportType}
              onChange={handleInputChange}
              label="Sport Type"
              className={classes.formInput}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sportTypes.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              autoComplete="description"
              name="eventDescription"
              variant="outlined"
              required
              fullWidth
              id="eventDescription"
              value={eventDescription}
              label="Event Description"
              multiline
              rows={3}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            <TextField
              id="eventStartTime"
              name="eventStartTime"
              label="Event Start"
              type="datetime-local"
              defaultValue={eventStartTime}
              onChange={handleInputChange}
              className={classes.formInput}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="eventEndTime"
              name="eventEndTime"
              label="Event End"
              type="datetime-local"
              defaultValue={eventEndTime}
              onChange={handleInputChange}
              className={classes.formInput}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name="entryFee"
              variant="outlined"
              required
              fullWidth
              id="entryFee"
              label="Entry Fee"
              value={entryFee}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            <div className={classes.eventParticipants}>
              <TextField
                name="maximumParticipants"
                variant="outlined"
                required
                fullWidth
                id="maximumParticipants"
                label="Maximum Participants"
                value={maximumParticipants}
                onChange={handleInputChange}
                className={classes.formInput}
              />
              <TextField
                name="minimumParticipants"
                variant="outlined"
                required
                fullWidth
                id="minimumParticipants"
                label="Minimum Participants"
                value={minimumParticipants}
                onChange={handleInputChange}
                className={classes.formInput}
              />
            </div>

            <div className={classes.dialogBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.dialogBtn}
              >
                Create Event
              </Button>

              <Button
                variant="contained"
                color="secondary"
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

export default CreateEventDialog
