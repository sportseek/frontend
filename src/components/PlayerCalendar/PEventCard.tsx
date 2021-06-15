import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { IconButton } from "@material-ui/core"
import { CloseRounded } from "@material-ui/icons"
import Tooltip from "components/Common/Tooltip"
import { IPersonalEvent } from "types"

const useStyles = makeStyles({
  cardValue: {
    fontWeight: 400,
    marginBottom: -7,
  },
})

const PersonalEventCard = (props: PEventProps) => {
  const classes = useStyles()
  const { event, handleClose } = props

  return (
    <Card>
      <CardHeader
        title="Details"
        action={
          <Tooltip title="Edit location" placement="left">
            <IconButton
              color="secondary"
              aria-label="edit location"
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography
          align="center"
          variant="h3"
          color="secondary"
          className={classes.cardValue}
        >
          {event.title}
        </Typography>
      </CardContent>
    </Card>
  )
}

type PEventProps = {
  event: IPersonalEvent
  handleClose: () => void
}

export default PersonalEventCard
