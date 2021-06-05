import { makeStyles, Theme } from "@material-ui/core/styles"
import ArenaEvents from "components/ArenaEvents"
import React, { FC } from "react"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  },
  arenaDashboardWrapper: {
    border: "1px solid black",
    marginTop: "32px",
  },
  arenaEvents: {
    width: "50%",
  },
  arenaDetails: {
    width: "50%",
  },
}))

const ArenaDashboard: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.arenaEvents}>
        <ArenaEvents />
      </div>
      <div className={classes.arenaDetails}>arena details</div>
    </div>
  )
}

export default ArenaDashboard
