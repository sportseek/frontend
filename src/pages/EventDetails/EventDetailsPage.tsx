import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { styled } from "@material-ui/core/styles"
import {
  Breadcrumbs,
  Link,
  Fab as MuiFab,
  Grid,
  Typography,
} from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectCurrentEvent,
  fetchEventById,
} from "redux/reducers/event/eventSlice"

import EventDetails from "components/EventDetails"
import { EVENT_DETAILS_HEADER } from "utils/constants"

const Root = styled("div")({
  display: "flex",
  flex: 1,
})

const Header = styled(Grid)({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "space-between",
})

const Fab = styled(MuiFab)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(10),
  right: theme.spacing(5),
  zIndex: 500,
}))

type EventDetailsProps = {
  id: string
  parentPage: string
  goBack: () => void
}

const EventDetailsPage = (props: EventDetailsProps) => {
  const { id, goBack, parentPage } = props
  const dispatch = useAppDispatch()
  const event = useAppSelector(selectCurrentEvent)

  const { title = "" } = event

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    goBack()
  }

  useEffect(() => {
    if (id) dispatch(fetchEventById(id))
  }, [dispatch, id])

  return (
    <Root>
      <Grid container spacing={2}>
        <Helmet title={EVENT_DETAILS_HEADER} />
        <Header item xs={12} lg={4}>
          <Breadcrumbs aria-label="Breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              <Typography variant="subtitle2">{parentPage}</Typography>
            </Link>
            <Typography variant="subtitle2">
              {" "}
              {EVENT_DETAILS_HEADER}{" "}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {title}
            </Typography>
          </Breadcrumbs>
          <Fab variant="extended" size="small" color="primary" onClick={goBack}>
            <ChevronLeft />
            Back
          </Fab>
        </Header>
        <Grid item xs lg={12}>
          <EventDetails />
        </Grid>
      </Grid>
    </Root>
  )
}

export default EventDetailsPage
