import React, { useEffect, useRef } from "react"
import Helmet from "react-helmet"
import { styled } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import { useAppDispatch } from "redux/hooks"
import { fetchEventById } from "redux/reducers/event/eventSlice"
import { RouteComponentProps, useParams } from "react-router-dom"
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

const EventDetailsPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id: string }>()

  const rootDivRef = useRef<HTMLDivElement>(null)

  const useMountEffect = (scroll: any) => useEffect(scroll, [scroll])

  const executeScroll = () => {
    if (rootDivRef && rootDivRef.current)
      rootDivRef.current.scrollIntoView({
        behavior: "smooth",
      })
  }

  useMountEffect(executeScroll)

  useEffect(() => {
    if (id) dispatch(fetchEventById(id))
  }, [dispatch, id])

  return (
    <Root ref={rootDivRef}>
      <Grid container spacing={2}>
        <Helmet title={EVENT_DETAILS_HEADER} />
        <Header item xs={12} lg={4} />
        <Grid item xs lg={12}>
          <EventDetails />
        </Grid>
      </Grid>
    </Root>
  )
}

export default EventDetailsPage
