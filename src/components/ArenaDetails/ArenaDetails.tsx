import React from "react"
import { spacing } from "@material-ui/system"
import { makeStyles, styled } from "@material-ui/core/styles"
import {
  Grid,
  Button,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Card as MuiCard,
} from "@material-ui/core"

import { useAppSelector } from "redux/hooks"
import { selectUser } from "redux/reducers/user/userSlice"
import { IArenaOwner, IPlayer } from "types"
import UpdateArenaDialog from "components/UpdateArenaDialog"

const Card = styled(MuiCard)(spacing)

const useStyles = makeStyles({
  cardHeader: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
  cardContent: {
    paddingTop: 4,
    paddingLeft: 24,
    paddingBottom: 0,
  },
  cardActions: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 4,
    justifyContent: "flex-end",
  },
  card: {
    marginTop: "16px",
    marginBottom: "16px",
  },
})

export default function ArenaDetails() {
  const classes = useStyles()
  const arena = useAppSelector(selectUser) as IArenaOwner

  const { arenaName, email, phone } = arena

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} title="Personal info" />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="caption" gutterBottom>
              Arena name
            </Typography>
            <Typography variant="body2" gutterBottom>
              {arenaName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Email
            </Typography>
            <Typography variant="body2" gutterBottom>
              {email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Phone
            </Typography>
            <Typography variant="body2" gutterBottom>
              {phone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={handleClickOpen} size="small">
          <Typography>Edit details</Typography>
        </Button>
        <UpdateArenaDialog open={open} onClose={handleClose} isUpdate={true} arenaDetails={arena} />
      </CardActions>
    </Card>
  )
}
