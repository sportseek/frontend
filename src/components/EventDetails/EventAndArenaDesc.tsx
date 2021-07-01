import React from "react"

import { Typography, makeStyles } from "@material-ui/core"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { IEvent } from "types"
import { IArenaOwner } from "types"

type Props = {
  event: IEvent
  arena: IArenaOwner
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  details: {
    flexDirection: "column",
  },
})

const EventAndArenaDesc: React.FC<Props> = ({
  event: currentEvent,
  arena: currentArena,
}) => {
  const classes = useStyles()
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
      <AccordionDetails className={classes.details}>
        <Typography variant="subtitle1" display="block" align="left">
          <b>Hosted By:</b> {currentArena.arenaName}
        </Typography>
        <Typography variant="subtitle1" display="block" align="left">
          <b>Address:</b> {currentArena.address}
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography variant="subtitle1">{currentEvent.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default EventAndArenaDesc
