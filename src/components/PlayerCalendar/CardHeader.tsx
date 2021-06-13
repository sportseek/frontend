import React from "react"
import { styled } from "@material-ui/core/styles"
import { CardHeader as MuiCardHeader, IconButton } from "@material-ui/core"
import Tooltip from "components/Common/Tooltip"
import { ScheduleOutlined } from "@material-ui/icons"

const Root = styled(MuiCardHeader)({
  paddingBottom: 0,
})

const CardHeader = (props: HeaderProps) => {
  const { show, openSchedule } = props
  return (
    <Root
      title="Upcoming events"
      action={
        show && (
          <Tooltip title="Manage Schedule" placement="left">
            <IconButton
              color="secondary"
              aria-label="manage Schedule"
              onClick={openSchedule}
            >
              <ScheduleOutlined />
            </IconButton>
          </Tooltip>
        )
      }
    />
  )
}

type HeaderProps = {
  show: boolean
  openSchedule: () => void
}

export default CardHeader
