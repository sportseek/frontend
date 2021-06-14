import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { useAppSelector } from "redux/hooks"
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IPersonalEvent, IPlayer } from "types"

const useStyles = makeStyles({
  cardValue: {
    fontWeight: 400,
    marginBottom: -7,
  },
})

const PersonalEventCard = (props: PEventProps) => {
  const classes = useStyles()
  const { event } = props
  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const { wallet } = player

  const euro = "\u20AC"
  return (
    <Card>
      <CardHeader title={event.title} />
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
}

export default PersonalEventCard
