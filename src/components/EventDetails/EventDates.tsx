import React from "react"
import { Typography } from "@material-ui/core"
import moment from "moment"
import { IEvent } from "types"

type Props = {
  event: IEvent
}

const EventDates: React.FC<Props> = ({ event: currentEvent }) => {
  return (
    <div>
      <Typography variant="h6">
        <b>Starts: </b>
        {moment(currentEvent.start).format("LLLL")}
      </Typography>
      <Typography variant="h6">
        <b>Ends: </b>
        {moment(currentEvent.end).format("LLLL")}
      </Typography>
    </div>
  )
}

export default EventDates
