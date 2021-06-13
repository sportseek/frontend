import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { ArenaEvent } from "types/ArenaOwner"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import CreateEventDialog from "components/CreateEventDialog"
import Chip from "@material-ui/core/Chip"
import moment from "moment"
import { EventFullDetails } from "types/Event"

const useStyles = makeStyles({
  arenaEventCardWrapper: {
    margin: "16px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
  },
  eventHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

export interface ArenaEventCardProps {
  event: EventFullDetails
}
const ArenaEventCard = (props: ArenaEventCardProps) => {
  const classes = useStyles()
  const { event } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleClickOpenDialog = () => {
    handleCloseMenu()
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <div className={classes.arenaEventCardWrapper}>
      <div className={classes.eventHeader}>
        <h3>{event.title}</h3>
        <IconButton
          color="primary"
          onClick={handleClickMenu}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleClickOpenDialog}>Update</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
        </Menu>
        <CreateEventDialog
          open={openDialog}
          onClose={handleCloseDialog}
          isUpdate={true}
          selectedEvent={event}
        />
      </div>
      <div style={{width: "40%"}}>
        <Chip label={event.sportType} />
      </div>
      <p>{event.description}</p>
      <div>
        <b>Entry fee:</b> {event.entryFee}
      </div>
      <div>
        <b>Start Time:</b> {moment(event.start).format('LLLL')}
      </div>
      <div>
        <b>End Time:</b> {moment(event.end).format('LLLL')}
      </div>
      <div>
        <b>Maximum Participants:</b> {event.maxPlayers}
      </div>
      <div>
        <b>Minimum Participants:</b> {event.minPlayers}
      </div>
    </div>
  )
}

export default ArenaEventCard
