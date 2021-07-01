import React from "react"
import { Typography } from "@material-ui/core"
import { IArenaOwner } from "types"

type Props = {
  arena: IArenaOwner
}

const ArenaContact: React.FC<Props> = ({ arena: currentArena }) => {
  return (
    <div>
      {currentArena && (
        <Typography variant="h6" gutterBottom>
          <b>Phone Number:</b> {currentArena.phone}
        </Typography>
      )}
    </div>
  )
}

export default ArenaContact
