import React from "react"
import { styled } from "@material-ui/core/styles"
import { CardHeader as MuiCardHeader, Button } from "@material-ui/core"
import { ArrowForwardIos, ScheduleOutlined } from "@material-ui/icons"

const Root = styled(MuiCardHeader)({
  paddingBottom: 0,
})

const CardHeader = (props: HeaderProps) => {
  const { selectable, showActions, closeSchedule, openSchedule } = props
  return (
    <Root
      title="Upcoming events"
      action={
        showActions &&
        (selectable ? (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowForwardIos />}
            onClick={closeSchedule}
          >
            Back to Normal View
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ScheduleOutlined />}
            onClick={openSchedule}
          >
            Manage Schedule
          </Button>
        ))
      }
    />
  )
}

type HeaderProps = {
  showActions: boolean
  openSchedule: () => void
  closeSchedule: () => void
  selectable: boolean
}

export default CardHeader
