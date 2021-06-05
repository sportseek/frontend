import React, { FormEvent, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import { InputLabel, Select, MenuItem } from "@material-ui/core"

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

export interface CreateEventPayload {
  eventTitle: string
  sportType: string
  eventDescription: string
  eventDate: string
  eventStartTime: string
  eventEndTime: string
  entryFee: number
  maximumParticipants: number
  minimumParticipants: number
}

export interface CreateEventDialogProps {
  open: boolean
  onClose: () => void
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
  const { onClose, open } = props

  const [eventTitle, setEventTitle] = useState("")
  const [sportType, setSportType] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventStartTime, setEventStartTime] = useState("")
  const [eventEndTime, setEventEndTime] = useState("")
  const [entryFee, setEntryFee] = useState(0)
  const [maximumParticipants, setMaximumParticipants] = useState(0)
  const [minimumParticipants, setMinimumParticipants] = useState(0)

  const handleClose = () => {
    onClose()
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "eventTitle") setEventTitle(value)
    if (name === "sportType") setSportType(value)
    if (name === "eventDescription") setEventDescription(value)
    if (name === "eventDate") setEventDate(value)
    if (name === "eventStartTime") setEventStartTime(value)
    if (name === "eventEndTime") setEventEndTime(value)
    if (name === "entryFee") setEntryFee(+value)
    if (name === "maximumParticipants") setMaximumParticipants(+value)
    if (name === "minimumParticipants") setMinimumParticipants(+value)
  }

  const handleCreateEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: CreateEventPayload = {
      eventTitle: eventTitle,
      sportType: sportType,
      eventDescription: eventDescription,
      eventDate: eventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      entryFee: entryFee,
      maximumParticipants: maximumParticipants,
      minimumParticipants: minimumParticipants,
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
        <DialogTitle id="simple-dialog-title">Create Event</DialogTitle>
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
              label="Event Description"
              multiline
              rows={3}
              onChange={handleInputChange}
              className={classes.formInput}
            />

            <TextField
              className={classes.formInput}
              id="eventDate"
              name="eventDate"
              label="Event Date"
              type="date"
              defaultValue="2017-05-24"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div className={classes.eventTime}>
              <TextField
                id="eventStartTime"
                name="eventStartTime"
                label="Event Start"
                type="time"
                defaultValue="07:30"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />

              <TextField
                id="eventEndTime"
                name="eventEndTime"
                label="Event End"
                type="time"
                defaultValue="07:30"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>

            <TextField
              name="entryFee"
              variant="outlined"
              required
              fullWidth
              id="entryFee"
              label="Entry Fee"
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
