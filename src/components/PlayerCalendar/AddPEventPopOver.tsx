import React from "react"
import Popover from "@material-ui/core/Popover"
import { IPersonalEvent } from "types"
import PEventCard from "./PEventCard"

export default function AddPersonalEventPopOver(props: PopOverProps) {
  const { anchorEl, event, handleClose } = props

  console.log(JSON.stringify(event, null, 2))

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
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
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
