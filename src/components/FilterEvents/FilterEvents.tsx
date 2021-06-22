import React, { useEffect, useState } from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import Slider from "@material-ui/core/Slider"
import {
  LocationOn,
  SportsBasketball,
  Euro,
  People,
  Search,
} from "@material-ui/icons"
import { Button } from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  selectEventMaxPrice,
  selectEventMinPrice,
} from "redux/reducers/event/eventSlice"
import moment from "moment"

const drawerWidth = 240

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
      overflow: "hidden",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    drawerContainer: {
      overflow: "auto",
    },
    margin: {
      margin: theme.spacing(1),
    },
    emptyDiv: {
      height: "16px",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 190,
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

const FilterEvents = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const minPrice = useAppSelector(selectEventMinPrice)
  const maxPrice = useAppSelector(selectEventMaxPrice)

  const [eventTitle, setEventTitle] = useState("")
  const [sportsType, setSportsType] = useState("all")
  const [eventStartTime, setEventStartTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )
  const [eventEndTime, setEventEndTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsType(event.target.value)
  }

  const [eventFee, setEventFee] = React.useState<number[]>([minPrice, maxPrice])

  useEffect(() => {
    setEventFee([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setEventFee(newValue as number[])
  }

  function valuetext(value: number) {
    return `${value} €`
  }

  const handleSearch = () => {
    console.log(sportsType)
    dispatch(
      getAllEvents({
        eventTitle: eventTitle,
        sportType: sportsType === "all" ? "" : sportsType,
        eventStartTime: new Date(eventStartTime).toISOString() ,
        eventEndTime: new Date(eventEndTime).toISOString(),
        eventFee: eventFee
      })
    )
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "eventTitle") setEventTitle(value)
    if (name === "sportsType") setSportsType(value)
    if (name === "eventStartTime") setEventStartTime(value)
    if (name === "eventEndTime") setEventEndTime(value)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <Divider />
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="h2">
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
              <Grid item xs={2}>
                <Search />
              </Grid>
              <Grid item xs={10}>
                <TextField label="Location" className={classes.textField} />
              </Grid>
              <Grid item xs={2}>
                <LocationOn />
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
              <Grid item xs={2}>
                <SportsBasketball />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <TextField
                  label="From Date/Time"
                  type="datetime-local"
                  className={classes.textField}
                  id="eventStartTime"
                  name="eventStartTime"
                  defaultValue={eventStartTime}
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
                  defaultValue={eventEndTime}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography gutterBottom>Price Range (€)</Typography>
                <Slider
                  value={eventFee}
                  max={maxPrice}
                  min={minPrice}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  id="eventFee"
                  name="eventFee"
                />
              </Grid>
            </Grid>

            <Button onClick={handleSearch}>search</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default FilterEvents
