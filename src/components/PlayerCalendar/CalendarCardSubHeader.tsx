import React from "react"
import { styled } from "@material-ui/core/styles"
import { Chip } from "@material-ui/core"

const InterestedChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.interestedEventColor.main,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const PersonalChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.personalEventColor.main,
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const RegisteredChip = styled(Chip)(({ theme }) => ({
  background: theme.calendar.registeredEventColor.main,
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
    <PersonalChip variant="outlined" size="small" label="Personal" />
    <InterestedChip variant="outlined" size="small" label="Interested" />
    <RegisteredChip variant="outlined" size="small" label="Registered" />
  </Root>
)

export default SubHeader
