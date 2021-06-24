import React from "react"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Errorbar = (props: Props) => {
  const { errors = [] } = props

  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  console.log(errors)

  React.useEffect(() => {
    setOpen(errors.length > 0)
  }, [errors])

  return (
    <>
      {errors.map((error) => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}

type Props = {
  errors: []
}

export default Errorbar
