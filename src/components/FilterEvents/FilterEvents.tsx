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
  DateRange,
  QueryBuilder,
  Euro,
  People,
} from "@material-ui/icons"

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

const sportsTypes = [
  {
    value: "Basketball",
  },
  {
    value: "Football",
  },
  {
    value: "Tennis",
  },
  {
    value: "Golf",
  },
]

const FilterEvents = () => {
  const classes = useStyles()

  const [sportsType, setSportsType] = React.useState("Basketball")

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSportsType(event.target.value)
  }

  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  function valuetext(value: number) {
    return `${value} €`;
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
                  {sportsTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
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
                <Typography gutterBottom>
                  Price Range (€)
                </Typography>
                <Slider
                  value={value}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default FilterEvents
