import React from "react"
import {
  Grid,
  Typography,
  CardHeader,
  CardContent,
  Card as MuiCard,
} from "@material-ui/core"
import { makeStyles, styled } from "@material-ui/core/styles"
import { spacing } from "@material-ui/system"
import { IArenaOwner } from "types"

type Props = {
  arena: IArenaOwner
}

const Card = styled(MuiCard)(spacing)

const useStyles = makeStyles({
  cardHeader: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
  cardContent: {
    paddingTop: 4,
    paddingLeft: 24,
    paddingBottom: 8,
  },
  cardActions: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 4,
    justifyContent: "flex-end",
  },
  card: {
    height: "100%",
  },
})

const ArenaContact: React.FC<Props> = ({ arena: currentArena }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        title="Contact Information"
      ></CardHeader>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" gutterBottom>
          <b>Phone:</b> {currentArena.phone}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>E-Mail:</b> {currentArena.email}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ArenaContact
