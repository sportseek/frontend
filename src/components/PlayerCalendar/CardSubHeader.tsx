import React from "react"
import { styled } from "@material-ui/core/styles"
import { Chip } from "@material-ui/core"

const InterestedChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.interestedEventColor,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const RegisteredChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.registeredEventColor,
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const Root = styled("div")({
  display: "flex",
  flex: 1,
  margin: "auto",
  alignItems: "center",
  justifyContent: "flex-end",
})

const SubHeader = () => (
  <Root>
    <InterestedChip variant="outlined" size="small" label="Interested" />
    <RegisteredChip variant="outlined" size="small" label="Registered" />
  </Root>
)

export default SubHeader
