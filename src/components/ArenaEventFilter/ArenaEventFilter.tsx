import { makeStyles, Theme, createStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import React, { useState } from "react"
import { useAppDispatch } from "redux/hooks"

import Menu from "@material-ui/core/Menu"
import Button from "@material-ui/core/Button"
import Tooltip from "components/Common/Tooltip"
import FilterListIcon from "@material-ui/icons/FilterList"
import moment from "moment"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { SportsBasketball, Search } from "@material-ui/icons"
import { getEvents } from "redux/reducers/event/eventSlice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: theme.filterbar.width,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerPaper: {
      width: theme.filterbar.width,
      background: "linear-gradient(to top, #03142b 0%, #1e3f59 100%);",
      overflow: "hidden",
      zIndex: 600,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    drawerContainer: {
      // overflow: "auto",
    },
    margin: {
      margin: theme.spacing(1),
    },
    emptyDiv: {
      height: "16px",
    },
    buttons: {
      marginTop: "16px",
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 195,
    },
    text: {
      color: theme.palette.common.white,
    },
  })
)

const sportTypes = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "football",
    name: "Football",
  },
  {
    id: "cricket",
    name: "Cricket",
  },
]

type Props = {
  getFilterPayload: Function
}
const ArenaEventFilter: React.FC<Props> = ({ getFilterPayload }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [eventTitle, setEventTitle] = useState("")
  const [sportsType, setSportsType] = useState("all")

  const [eventStartTime, setEventStartTime] = useState("")
  const [eventEndTime, setEventEndTime] = useState("")

  const setInitialState = () => {
    setEventTitle("")
    setSportsType("all")
    setEventStartTime("")
    setEventEndTime("")
  }

  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeFilterMenu = () => {
    setAnchorEl(null)
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "eventTitle") setEventTitle(value)
    if (name === "sportsType") setSportsType(value)
    if (name === "eventStartTime") setEventStartTime(value)
    if (name === "eventEndTime") setEventEndTime(value)
  }

  const handleFilter = () => {
    // dispatch(
    //   getEvents({
    //     eventTitle,
    //     sportType: sportsType === "all" ? "" : sportsType,
    //     eventStartTime: eventStartTime
    //       ? new Date(eventStartTime).toISOString()
    //       : "",
    //     eventEndTime: eventEndTime ? new Date(eventEndTime).toISOString() : "",
    //     pageNumber: 1,
    //     pageSize: 5,
    //   })
    // )
    getFilterPayload({
      eventTitle,
      sportType: sportsType === "all" ? "" : sportsType,
      eventStartTime: eventStartTime
        ? new Date(eventStartTime).toISOString()
        : "",
      eventEndTime: eventEndTime ? new Date(eventEndTime).toISOString() : "",
      pageNumber: 1,
      pageSize: 5,
    })
    setInitialState()
    closeFilterMenu()
  }

  const handleClear = () => {
    dispatch(getEvents({}))
    setInitialState()
    closeFilterMenu()
  }

  return (
    <div>
      <Tooltip title="Toggle filter panel">
        <IconButton
          aria-label="filter"
          color="inherit"
          onClick={openFilterMenu}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeFilterMenu}
        elevation={0}
      >
        <div className={classes.margin}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.text}
              >
                Filters
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Search"
                className={classes.textField}
                id="eventTitle"
                name="eventTitle"
                value={eventTitle}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                select
                label="Sports Type"
                value={sportsType}
                onChange={handleInputChange}
                className={classes.textField}
                id="sportsType"
                name="sportsType"
              >
                {sportTypes.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.emptyDiv} />
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12}>
              <TextField
                label="From Date/Time"
                type="datetime-local"
                className={classes.textField}
                id="eventStartTime"
                name="eventStartTime"
                defaultValue={moment().format("YYYY-MM-DDTHH:MM")}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="To Date/Time"
                type="datetime-local"
                className={classes.textField}
                id="eventEndTime"
                name="eventEndTime"
                defaultValue={moment().format("YYYY-MM-DDTHH:MM")}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFilter}
            >
              Search
            </Button>
            <Button variant="contained" color="primary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  )
}

export default ArenaEventFilter
