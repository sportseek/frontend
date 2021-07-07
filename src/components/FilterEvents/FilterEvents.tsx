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
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyC3piWVpJ50bb8sVq-vGZnf6nbJMgyNtSE")
Geocode.setLanguage("en")

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return
  }

  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("id", id)
  script.src = src
  position.appendChild(script)
}

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
  {
    id: "registeredPlayersDescending",
    name: "Registered Players: Descending",
  },
  {
    id: "registeredPlayersAscending",
    name: "Registered Players: Ascending",
  },
]

const FilterEvents = () => {
  const [lat, setLat] = React.useState<number>(0)
  const [lng, setLng] = React.useState<number>(0)

  function latlngGen(place: string) {
    Geocode.fromAddress(place).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        setLat(lat)
        setLng(lng)
        console.log(lat, lng)
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
  const loaded = React.useRef(false)

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF_-gtDuOK1_Y7T9HhOTuLJgOuo1yoM-w&libraries=places",
        document.querySelector("head"),
        "google-maps"
      )
    }

    loaded.current = true
  }

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

  let minDate = useAppSelector(selectEventMinDate)
  let maxDate = useAppSelector(selectEventMaxDate)

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
        eventTitle: eventTitle,
        sportType: sportsType === "all" ? "" : sportsType,
        eventStartTime: new Date(eventStartTime).toISOString(),
        eventEndTime: new Date(eventEndTime).toISOString(),
        eventFee: eventFee,
        location: lat===0? "":{lat, lng},
        sortBy: sortBy,
        sortValue: sortValue

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
      if(value==="priceDescending")
      {
        setSortBy("entryFee")
        setSortValue(-1)
      }
      else if(value==="priceAscending")
      {
        setSortBy("entryFee")
        setSortValue(1)
      }
      else{
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
                <Autocomplete
                  style={{ width: 300 }}
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
                    newValue
                      ? latlngGen(newValue.description)
                      : console.log("NULL")
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputLoc(newInputValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      className={classes.textField}
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
                        <Grid item>
                          <LocationOn />
                        </Grid>
                        <Grid item xs>
                          {parts.map((part: any, index: any) => (
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
                      </Grid>
                    )
                  }}
                />
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
                  value={eventStartTime}
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
                  value={eventEndTime}
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
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  select
                  label="Sort By:"
                  value={sortShow}
                  onChange={handleInputChange}
                  className={classes.textField}
                  id="sortBy"
                  name="sortBy"
                >
                  {sortByOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Sort />
              </Grid>
            </Grid>
            <div className={classes.emptyDiv} />
            <Divider />
            <div className={classes.emptyDiv} />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default FilterEvents
