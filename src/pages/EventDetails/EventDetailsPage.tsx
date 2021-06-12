import React from "react"
import Helmet from "react-helmet"
import { styled } from "@material-ui/core/styles"
import { Breadcrumbs, Button, Grid, Typography } from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"
import { useAppSelector } from "redux/hooks"
import { selectCurrentEvent } from "redux/reducers/event/eventSlice"

import EventDetails from "components/EventDetails"
import { EVENT_DETAILS_HEADER } from "utils/constants"

const Header = styled(Grid)({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "space-between",
})

type EventDetailsProps = {
  parentPage: string
  goBack: () => void
}

const EventDetailsPage = (props: EventDetailsProps) => {
  const { goBack, parentPage } = props

  const event = useAppSelector(selectCurrentEvent)

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
