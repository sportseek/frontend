import React from "react"
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
import { useAppDispatch } from "redux/hooks"
import { getAllEvents } from "redux/reducers/event/eventSlice"

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
  const [sportsType, setSportsType] = React.useState("all")

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsType(event.target.value)
  }

  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  function valuetext(value: number) {
    return `${value} €`
  }

  const handleSearch = () => {
    console.log(sportsType)
    dispatch(
      getAllEvents({
        sportType: sportsType === "all" ? "" : sportsType,
      })
    )
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
                <TextField label="Search" className={classes.textField} />
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
                  onChange={handleChangeType}
                  className={classes.textField}
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
                  defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="To Date/Time"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={classes.textField}
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
                  value={value}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
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
