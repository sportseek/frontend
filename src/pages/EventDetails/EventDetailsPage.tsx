import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { styled } from "@material-ui/core/styles"
import { Breadcrumbs, Button, Grid, Typography } from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectCurrentEvent,
  fetchEventById,
} from "redux/reducers/event/eventSlice"

import EventDetails from "components/EventDetails"
import { EVENT_DETAILS_HEADER } from "utils/constants"

const Header = styled(Grid)({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "space-between",
})

type EventDetailsProps = {
  id: string
  parentPage: string
  goBack: () => void
}

const EventDetailsPage = (props: EventDetailsProps) => {
  const { id, goBack, parentPage } = props
  const dispatch = useAppDispatch()
  const event = useAppSelector(selectCurrentEvent)

  useEffect(() => {
    dispatch(fetchEventById(id))
  }, [dispatch, id])

  return (
    <Grid container spacing={1}>
      <Helmet title={EVENT_DETAILS_HEADER} />
      <Header item xs={12} lg={4}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Typography variant="subtitle2">{parentPage}</Typography>
          <Typography variant="subtitle2"> {EVENT_DETAILS_HEADER} </Typography>
          <Typography variant="subtitle2" color="secondary">
            {event.title}
          </Typography>
        </Breadcrumbs>

        <Button
          size="small"
          color="primary"
          startIcon={<ChevronLeft />}
          onClick={goBack}
        >
          <Typography variant="subtitle2">Back</Typography>
        </Button>
      </Header>
      <Grid item xs lg={12}>
        <EventDetails event={event} />
      </Grid>
    </Grid>
  )
}

export default EventDetailsPage
