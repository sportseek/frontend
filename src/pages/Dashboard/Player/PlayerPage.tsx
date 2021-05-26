import React from "react"
import {
  makeStyles,
  createStyles,
  Theme,
  styled,
} from "@material-ui/core/styles"
import {Grid, Paper} from "@material-ui/core"
import Helmet from "react-helmet"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      flex: 1,
      height: 400,
      color: theme.palette.text.secondary,
    },
  })
)

const Root = styled("div")({
  flex: 1,
})

const Column1 = styled(Grid)({})

const Col1Container = styled(Grid)({})

const Column2 = styled(Grid)({})

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Root>
      <Helmet title="Dashboard" />
      <Grid container spacing={3}>
        <Column1 item xs={12} lg={4}>
          <Col1Container container spacing={3} direction="column" justify="space-evenly">
            <Grid item>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
          </Col1Container>
        </Column1>
        <Column2 item xs={12} lg>
          <Grid container spacing={3} direction="column" justify="space-between">
            <Grid item>
              <Grid container spacing={3}>
                <Grid item lg={6}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item lg={6}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
          </Grid>
        </Column2>
      </Grid>
    </Root>
  )
}

export default Dashboard
