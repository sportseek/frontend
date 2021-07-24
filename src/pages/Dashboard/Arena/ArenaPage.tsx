import { makeStyles, Theme } from "@material-ui/core/styles"
import ArenaDetails from "components/ArenaDetails"
import ArenaEvents from "components/ArenaEvents"
import ArenaImage from "components/ArenaImage/ArenaImage"
import Location from "components/Location"
import React, { FC } from "react"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arenaDashboardWrapper: {
    border: "1px solid black",
    marginTop: "32px",
  },
  arenaEvents: {
    width: "58%",
  },
  arenaDetails: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}))

const ArenaDashboard: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.arenaEvents}>
        <ArenaEvents />
      </div>
      <div className={classes.arenaDetails}>
        <ArenaImage />
        <ArenaDetails />
        <Location />
      </div>
    </div>
  )
}

export default ArenaDashboard
