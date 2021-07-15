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
import { selectLoggedInUser } from "redux/reducers/user/userSlice"
import { IAddress, IArenaOwner } from "types"
import UpdateArenaDialog from "components/UpdateArenaDialog"

import { getFormattedAddress } from "utils/stringUtils"

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
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  card: {
    marginTop: "16px",
    marginBottom: "16px",
  },
})

export default function ArenaDetails() {
  const classes = useStyles()
  const arena = useAppSelector(selectLoggedInUser) as IArenaOwner

  const { arenaName, email, phone, address = {} as IAddress } = arena

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card raised className={classes.card}>
      <CardHeader className={classes.cardHeader} title="Arena info" />
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
            <Typography variant="caption" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getFormattedAddress(address)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          size="small"
        >
          <Typography>Edit details</Typography>
        </Button>
        <UpdateArenaDialog
          open={open}
          onClose={handleClose}
          isUpdate
          arenaDetails={arena}
        />
      </CardActions>
    </Card>
  )
}
