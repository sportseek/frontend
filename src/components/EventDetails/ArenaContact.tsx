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
import PhoneIcon from "@material-ui/icons/Phone"
import EmailIcon from "@material-ui/icons/Email"
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
    <Card raised className={classes.card}>
      <CardHeader className={classes.cardHeader} title="Contact Information" />
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <PhoneIcon color="primary" style={{ marginRight: "10px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {currentArena.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <EmailIcon color="primary" style={{ marginRight: "10px" }} />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {currentArena.email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArenaContact
