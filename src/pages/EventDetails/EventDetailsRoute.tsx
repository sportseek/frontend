import React, { useEffect, useRef } from "react"
import Helmet from "react-helmet"
import { styled } from "@material-ui/core/styles"
import { Fab as MuiFab, Grid } from "@material-ui/core"
import { ChevronLeft } from "@material-ui/icons"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectCurrentEvent,
  fetchEventById,
} from "redux/reducers/event/eventSlice"
import { useHistory, RouteComponentProps, useParams } from "react-router-dom"
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

const EventDetailsPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useAppDispatch()
  const event = useAppSelector(selectCurrentEvent)

  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const rootDivRef = useRef<HTMLDivElement>(null)

  const useMountEffect = (scroll: any) => useEffect(scroll, [scroll])

  const executeScroll = () => {
    if (rootDivRef && rootDivRef.current)
      rootDivRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }

  const goBack = () => {
    history.goBack()
  }

  useMountEffect(executeScroll)

  useEffect(() => {
    if (id) dispatch(fetchEventById(id))
  }, [dispatch, id])

  return (
    <Root ref={rootDivRef}>
      <Grid container spacing={2}>
        <Helmet title={EVENT_DETAILS_HEADER} />
        <Header item xs={12} lg={4}>
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            onClick={goBack}
          >
            <ChevronLeft />
            Back
          </Fab>
        </Header>
        <Grid item xs lg={12}>
          <EventDetails event={event} />
        </Grid>
      </Grid>
    </Root>
  )
}

export default EventDetailsPage
