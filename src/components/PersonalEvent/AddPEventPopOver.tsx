import React from "react"
import Popover from "@material-ui/core/Popover"
import { IPersonalEvent } from "types"
import PEventCard from "./PersonalEventCard"

export default function AddPersonalEventPopOver(props: PopOverProps) {
  const { anchorEl, event, handleClose } = props

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <PEventCard event={event} handleClose={handleClose} />
      </Popover>
    </div>
  )
}

type PopOverProps = {
  anchorEl: HTMLElement | null
  event: IPersonalEvent
  handleClose: () => void
}
