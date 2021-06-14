import React from "react"
import { styled } from "@material-ui/core/styles"
import { CardHeader as MuiCardHeader, IconButton } from "@material-ui/core"
import Tooltip from "components/Common/Tooltip"
import { CancelOutlined, ScheduleOutlined } from "@material-ui/icons"
import { red } from '@material-ui/core/colors';

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
          <Tooltip open={selectable} title="Go back to Normal mode" placement="left">
            <IconButton
              aria-label="close editing"
              onClick={closeSchedule}
            >
              <CancelOutlined style={{ color: red[500] }}/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip open={selectable} title="Manage Schedule" placement="left">
            <IconButton
              color="secondary"
              aria-label="manage Schedule"
              onClick={openSchedule}
            >
              <ScheduleOutlined />
            </IconButton>
          </Tooltip>
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
