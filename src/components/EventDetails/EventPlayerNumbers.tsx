import React from "react"
import { Typography } from "@material-ui/core"
import { IEvent } from "types"

type Props = {
  event: IEvent
}

const PlayerNumbers: React.FC<Props> = ({ event: currentEvent }) => {
  return (
    <div>
      <Typography variant="h6">
        Players <b>Registered</b>:{" "}
        {currentEvent.registeredPlayers &&
          currentEvent.registeredPlayers.length}
      </Typography>
      <Typography variant="h6">
        Available slots:{" "}
        {currentEvent.registeredPlayers &&
          currentEvent.maxPlayers - currentEvent.registeredPlayers.length}
      </Typography>
      <Typography variant="h6">
        Players <b>Interested</b>:{" "}
        {currentEvent.interestedPlayers &&
          currentEvent.interestedPlayers.length}
      </Typography>
    </div>
  )
}

export default PlayerNumbers
