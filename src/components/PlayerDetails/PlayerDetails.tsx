import React, { useState } from "react"
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
import { IPlayer } from "types"
import { getUserAddress } from "utils/stringUtils"

import EditCustomerForm from "./EditDetails"

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
    height: "100%",
  },
})

export default function PersonalInfoCard() {
  const classes = useStyles()
  const [openEditForm, setOpenEditForm] = useState(false)
  const player = useAppSelector(selectLoggedInUser) as IPlayer

  const { address, firstName, lastName, phone, email } = player

  const popUpEditCustomerForm = () => setOpenEditForm(true)

  const closeFormPopUp = () => setOpenEditForm(false)

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} title="Personal info" />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="caption" gutterBottom>
              First name
            </Typography>
            <Typography variant="body2" gutterBottom>
              {firstName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" gutterBottom>
              Last name
            </Typography>
            <Typography variant="body2" gutterBottom>
              {lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" gutterBottom>
              Email
            </Typography>
            <Typography variant="body2" gutterBottom>
              {email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" gutterBottom>
              Phone
            </Typography>
            <Typography variant="body2" gutterBottom>
              {phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getUserAddress(address)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={popUpEditCustomerForm} size="small">
          <Typography>Edit details</Typography>
        </Button>
        <EditCustomerForm open={openEditForm} handleClose={closeFormPopUp} />
      </CardActions>
    </Card>
  )
}
