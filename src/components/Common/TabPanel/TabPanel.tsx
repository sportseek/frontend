import React, { PropsWithChildren } from "react"
import Box from "@material-ui/core/Box"

type TabProps = {
  index: number
  value: number
}

export default function TabPanel(props: PropsWithChildren<TabProps>) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  )
}
