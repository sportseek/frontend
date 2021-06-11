import React from "react"
import { Theme, makeStyles } from "@material-ui/core/styles"
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip"
import Zoom from "@material-ui/core/Zoom"

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.primary.light,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.light,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

export default function CustomTooltip(props: TooltipProps) {
  const classes = useStyles()

  return (
    <Tooltip arrow classes={classes} TransitionComponent={Zoom} {...props} />
  )
}
