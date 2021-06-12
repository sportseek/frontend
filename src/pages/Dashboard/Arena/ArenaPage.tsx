import { makeStyles, Theme } from "@material-ui/core/styles"
import ArenaEvents from "components/ArenaEvents"
import ArenaImage from "components/ArenaImage/ArenaImage"
import React, { FC } from "react"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  arenaDashboardWrapper: {
    border: "1px solid black",
    marginTop: "32px",
  },
  arenaEvents: {
    width: "50%",
  },
  arenaDetails: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
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
      </div>
    </div>
  )
}

export default ArenaDashboard
