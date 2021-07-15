import React from "react"

import { Typography, makeStyles } from "@material-ui/core"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { getFormattedAddress } from "utils/stringUtils"

import { IArenaOwner, IEvent } from "types"

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
    <Accordion elevation={8}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">
          <b>Event Description and Arena Details</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Typography variant="h6" display="block" align="left">
          <b>Hosted By:</b> {currentArena.arenaName}
        </Typography>
        <Typography variant="h6" display="block" align="left">
          <b>Address:</b> {getFormattedAddress(currentArena.address)}
        </Typography>
      </AccordionDetails>
      <AccordionDetails>
        <Typography variant="h6">{currentEvent.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default EventAndArenaDesc
