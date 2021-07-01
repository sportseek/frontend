import React from "react"

import { Typography } from "@material-ui/core"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { IEvent } from "types"

type Props = {
  event: IEvent
}

const EventAndArenaDesc: React.FC<Props> = ({ event: currentEvent }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">
          Event Description and Arena Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">{currentEvent.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default EventAndArenaDesc
