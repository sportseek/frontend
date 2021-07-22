import React, { FormEvent, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import { InputLabel, Select, MenuItem } from "@material-ui/core"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import {
  clearEventErrors,
  createEvent,
  selectEventErrors,
  selectHasErrors,
  selectLoading,
  updateEvent,
} from "redux/reducers/event/eventSlice"
import { IArenaOwner, IEvent, CreateEventPayload } from "types"
import IconButton from "@material-ui/core/IconButton"
import Edit from "@material-ui/icons/Edit"

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
  imageWrapper: {
    textAlign: "center",
    position: "relative",
  },
  profileImage: {
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "200px",
  },
  profileImgButton: {
    position: "absolute",
    top: "80%",
    left: "70%",
  },
})

export interface CreateEventDialogProps {
  open: boolean
  onClose: () => void
  isUpdate: boolean
  selectedEvent?: IEvent
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
  const user = useAppSelector(selectLoggedInUser) as IArenaOwner
  const eventErrors = useAppSelector(selectEventErrors)
  const hasErrors = useAppSelector(selectHasErrors)
  const isLoading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()

  const errors = eventErrors as IEvent

  const [eventImage, setEventImage] = useState<any>(null)
  const [eventTitle, setEventTitle] = useState("")
  const [sportType, setSportType] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventStartTime, setEventStartTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )
  const [eventEndTime, setEventEndTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )
  const [entryFee, setEntryFee] = useState("")
  const [maximumParticipants, setMaximumParticipants] = useState("")
  const [minimumParticipants, setMinimumParticipants] = useState("")

  const defaultImage =
    "https://res.cloudinary.com/fshahriar008/image/upload/v1609701702/user_bccush.png"
  const [imageUrl, setImageUrl] = useState(defaultImage)
  const hidden = true

  const setInitailState = () => {
    setEventTitle("")
    setSportType("")
    setEventDescription("")
    setEventStartTime(moment().format("YYYY-MM-DDTHH:MM"))
    setEventEndTime(moment().format("YYYY-MM-DDTHH:MM"))
    setEntryFee("")
    setMaximumParticipants("")
    setMinimumParticipants("")
    setImageUrl(defaultImage)
  }

  useEffect(() => {
    if (isUpdate && selectedEvent) {
      setEventTitle(selectedEvent.title as string)
      setSportType(selectedEvent.sportType)
      setEventDescription(selectedEvent.description)
      setEventStartTime(moment(selectedEvent.start).format("YYYY-MM-DDTHH:MM"))
      setEventEndTime(moment(selectedEvent.end).format("YYYY-MM-DDTHH:MM"))
      setEntryFee(selectedEvent.entryFee.toString())
      setMaximumParticipants(selectedEvent.maxPlayers.toString())
      setMinimumParticipants(selectedEvent.minPlayers.toString())
      setImageUrl(selectedEvent.eventImageUrl)
    }
  }, [isUpdate, selectedEvent])

  const handleClose = () => {
    if(!isUpdate) {
      setInitailState()
    }
    dispatch(clearEventErrors())
    onClose()
  }

  useEffect(() => {
    if(!isLoading && !hasErrors) {
      handleClose()
    }
  }, [isLoading, hasErrors])

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

    const formData = new FormData()
    formData.append("image", eventImage)
    formData.append("creator", user._id)
    formData.append("title", eventTitle)
    formData.append("sportType", sportType)
    formData.append("description", eventDescription)
    formData.append("start", new Date(eventStartTime).toISOString())
    formData.append("end", new Date(eventEndTime).toISOString())
    formData.append("entryFee", entryFee)
    formData.append("maxPlayers", maximumParticipants)
    formData.append("minPlayers", minimumParticipants)

    if (isUpdate && selectedEvent) {
      formData.append("_id", selectedEvent._id)
      dispatch(
        updateEvent({
          payload: formData,
          eventId: selectedEvent._id,
        })
      )
    } else {
      dispatch(createEvent(formData))
    }
    // console.log(hasErrors)
    // if(!hasErrors) {
    //   handleClose()
    // }
  }

  const handleImageChange = (event: any) => {
    const image = event.target.files[0]
    let src = URL.createObjectURL(event.target.files[0])
    let preview: any = document.getElementById("event-image-preview")
    preview.src = src
    setImageUrl(src)
    setEventImage(image)
    // api call
    const formData = new FormData()
    formData.append("image", image)
    // dispatch(updateProfilePic(formData))
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById("eventImageInput")
    fileInput?.click()
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
            <div className={classes.imageWrapper}>
              <img
                src={imageUrl}
                id="event-image-preview"
                alt="event"
                className={classes.profileImage}
              />
              <input
                type="file"
                id="eventImageInput"
                hidden={hidden}
                onChange={handleImageChange}
              />
              <IconButton color="primary" onClick={handleEditPicture}>
                <Edit />
              </IconButton>
            </div>
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
              error={!!errors.title}
              helperText={errors.title}
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
              error={!!errors.description}
              helperText={errors.description}
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
              error={!!errors.start}
              helperText={errors.start}
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
              error={!!errors.end}
              helperText={errors.end}
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
              error={!!errors.entryFee}
              helperText={errors.entryFee}
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
                style={{ marginRight: "16px" }}
                error={!!errors.maxPlayers}
                helperText={errors.maxPlayers}
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
                error={!!errors.minPlayers}
                helperText={errors.minPlayers}
              />
            </div>

            <div className={classes.dialogBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.dialogBtn}
              >
                {isUpdate ? "Update Event" : "Create Event"}
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
            {/* <div>
              <p>Event {isUpdate ? "updated" : "created"} successfully.</p>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                className={classes.dialogBtn}
                onClick={handleClose}
              >
                Close
              </Button>
            </div> */}
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateEventDialog
