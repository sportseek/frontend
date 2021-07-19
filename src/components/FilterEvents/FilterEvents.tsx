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
import { LocationOn, SportsBasketball, Search, Sort } from "@material-ui/icons"
import { Button } from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  getAllEvents,
  selectEventMaxPrice,
  selectEventMinPrice,
  selectEventMaxDate,
  selectEventMinDate,
} from "redux/reducers/event/eventSlice"
import moment from "moment"

import Autocomplete from "@material-ui/lab/Autocomplete"
import parse from "autosuggest-highlight/parse"
import throttle from "lodash/throttle"
import Geocode from "utils/geoCodeUtils"
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers"

const autocompleteService = { current: null }

interface PlaceType {
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
    main_text_matched_substrings: [
      {
        offset: number
        length: number
      }
    ]
  }
}

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
      background: theme.filterbar.background,
      overflowX: "hidden",
      overflowY: "auto",
      zIndex: 600,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1),
    },
    emptyDiv: {
      height: "16px",
    },
    buttons: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 195,
    },
    headertext: {
      color: theme.palette.common.white,
    },
    inputColor: {
      color: theme.palette.common.white,
    },
    dateField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 232,
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          display: "none",
        },
    },
    slider: {
      width: 215,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    endAdornment: {
      display: "none",
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

const sortByOptions = [
  {
    id: "start",
    name: "Date",
  },
  {
    id: "title",
    name: "Title",
  },
  {
    id: "sportType",
    name: "Sport Type",
  },
  {
    id: "priceDescending",
    name: "Price: Descending",
  },
  {
    id: "priceAscending",
    name: "Price: Ascending",
  },
]

const FilterEvents = () => {
  const [lat, setLat] = React.useState<number>(0)
  const [lng, setLng] = React.useState<number>(0)

  function latlngGen(place: string) {
    Geocode.fromAddress(place).then(
      (response) => {
        const { lat: resLat, lng: resLng } =
          response.results[0].geometry.location
        setLat(resLat)
        setLng(resLng)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const classes = useStyles()
  const dispatch = useAppDispatch()

  const [location, setLocation] = React.useState<PlaceType | null>(null)
  const [inputLoc, setInputLoc] = React.useState("")
  const [options, setOptions] = React.useState<PlaceType[]>([])

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          )
        },
        200
      ),
    []
  )

  const minPrice = useAppSelector(selectEventMinPrice)
  const maxPrice = useAppSelector(selectEventMaxPrice)

  const minDate = useAppSelector(selectEventMinDate)
  const maxDate = useAppSelector(selectEventMaxDate)

  const [eventTitle, setEventTitle] = useState("")
  const [sportsType, setSportsType] = useState("all")

  const [eventStartTime, setEventStartTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )
  const [eventEndTime, setEventEndTime] = useState(
    moment().format("YYYY-MM-DDTHH:MM")
  )

  const [eventFee, setEventFee] = React.useState<number[]>([minPrice, maxPrice])

  const [sortBy, setSortBy] = useState("start")
  const [sortValue, setSortValue] = useState(-1)
  const [sortShow, setSortShow] = useState("start")
  useEffect(() => {
    setEventFee([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  useEffect(() => {
    setEventStartTime(moment().format("YYYY-MM-DDTHH:MM"))
  }, [minDate])

  useEffect(() => {
    setEventEndTime(moment(maxDate).format("YYYY-MM-DDTHH:MM"))
  }, [maxDate])

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputLoc === "") {
      setOptions(location ? [location] : [])
      setLat(0)
      setLng(0)
      return undefined
    }

    fetch({ input: inputLoc }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[]

        if (location) {
          newOptions = [location]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [location, inputLoc, fetch])

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setEventFee(newValue as number[])
  }

  function valuetext(value: number) {
    return `${value} €`
  }

  const handleSearch = () => {
    dispatch(
      getAllEvents({
        eventTitle,
        sportType: sportsType === "all" ? "" : sportsType,
        eventStartTime: new Date(eventStartTime).toISOString(),
        eventEndTime: new Date(eventEndTime).toISOString(),
        eventFee,
        location: lat === 0 ? "" : { lat, lng },
        sortBy,
        sortValue,
      })
    )
  }

  const handleClear = () => {
    setEventStartTime(moment().format("YYYY-MM-DDTHH:MM"))
    setEventEndTime(moment(maxDate).format("YYYY-MM-DDTHH:MM"))
    setLocation(null)
    setSortBy("start")
    setSortShow("start")
    setEventTitle("")
    setSportsType("all")
    dispatch(
      getAllEvents({
        eventStartTime: new Date(
          moment().format("YYYY-MM-DDTHH:MM")
        ).toISOString(),
        eventEndTime: new Date(
          moment(maxDate).format("YYYY-MM-DDTHH:MM")
        ).toISOString(),
        sortBy: "start",
        sortValue: 1,
      })
    )
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name === "eventTitle") setEventTitle(value)
    if (name === "sportsType") setSportsType(value)
    if (name === "eventStartTime") setEventStartTime(value)
    if (name === "eventEndTime") setEventEndTime(value)

    if (name === "sortBy") {
      setSortShow(value)
      if (value === "priceDescending") {
        setSortBy("entryFee")
        setSortValue(-1)
      } else if (value === "priceAscending") {
        setSortBy("entryFee")
        setSortValue(1)
      } else {
        setSortBy(value)
      }
    }
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
        <div>
          <Divider />
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.headertext}
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
                  color="secondary"
                  onChange={handleInputChange}
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Search color="secondary" />
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
                  style={{ width: 300 }}
                  classes={{
                    inputRoot: classes.inputColor,
                    clearIndicator: classes.inputColor,
                    popupIndicator: classes.inputColor,
                  }}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                  }
                  filterOptions={(x) => x}
                  options={options}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={location}
                  onChange={(event: any, newValue: PlaceType | null) => {
                    setOptions(newValue ? [newValue, ...options] : options)
                    setLocation(newValue)
                    if (newValue) latlngGen(newValue.description)
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputLoc(newInputValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      className={classes.textField}
                      color="secondary"
                      InputLabelProps={{
                        className: classes.inputColor,
                      }}
                    />
                  )}
                  renderOption={(option) => {
                    const matches =
                      option.structured_formatting.main_text_matched_substrings
                    const parts = parse(
                      option.structured_formatting.main_text,
                      matches.map((match: any) => [
                        match.offset,
                        match.offset + match.length,
                      ])
                    )

                    return (
                      <Grid container alignItems="center">
                        <Grid item xs>
                          {parts.map((part: any, index: number) => (
                            <span
                              key={index}
                              style={{ fontWeight: part.highlight ? 700 : 400 }}
                            >
                              {part.text}
                            </span>
                          ))}
                          <Typography variant="body2" color="textSecondary">
                            {option.structured_formatting.secondary_text}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <LocationOn color="primary" />
                        </Grid>
                      </Grid>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <LocationOn color="secondary" />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  select
                  label="Sports Type"
                  color="secondary"
                  value={sportsType}
                  onChange={handleInputChange}
                  className={classes.textField}
                  id="sportsType"
                  name="sportsType"
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                  SelectProps={{
                    classes: { icon: classes.inputColor },
                  }}
                >
                  {sportTypes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <SportsBasketball color="secondary" />
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
                  color="secondary"
                  className={classes.dateField}
                  id="eventStartTime"
                  name="eventStartTime"
                  value={eventStartTime}
                  onChange={handleInputChange}
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                />
                {/* <KeyboardDateTimePicker
                  id="eventStartTime"
                  value={eventStartTime}
                  onChange={handleInputChange}
                  label="From Date/Time"
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                  format="YYYY-MM-DD HH:MM"
                /> */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="To Date/Time"
                  type="datetime-local"
                  color="secondary"
                  className={classes.dateField}
                  id="eventEndTime"
                  name="eventEndTime"
                  value={eventEndTime}
                  onChange={handleInputChange}
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                />

                {/* <KeyboardDateTimePicker
                  id="eventEndTime"
                  value={eventEndTime}
                  onChange={handleInputChange}
                  label="To Date/Time"
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                  format="YYYY-MM-DD HH:MM"
                /> */}
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <Typography gutterBottom className={classes.inputColor}>
                  Price Range (€)
                </Typography>
                <Slider
                  className={classes.slider}
                  value={eventFee}
                  max={maxPrice}
                  min={minPrice}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  id="eventFee"
                  name="eventFee"
                  color="secondary"
                />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  select
                  label="Sort By:"
                  color="secondary"
                  value={sortShow}
                  onChange={handleInputChange}
                  className={classes.textField}
                  id="sortBy"
                  name="sortBy"
                  InputProps={{
                    className: classes.inputColor,
                  }}
                  InputLabelProps={{
                    className: classes.inputColor,
                  }}
                  SelectProps={{
                    classes: { icon: classes.inputColor },
                  }}
                >
                  {sortByOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Sort color="secondary" />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <div className={classes.buttons}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default FilterEvents
