import React from "react"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Errorbar = (props: Props) => {
  const { errors = [] } = props

  const [open, setOpen] = React.useState(false)
  const [errs, setErrors] = React.useState(errors)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setErrors([])
    setOpen(false)
  }

  React.useEffect(() => {
    setOpen(errors.length > 0)
    setErrors(errors)
  }, [errors])

  return (
    <>
      {errs.map((error) => (
        <Snackbar
          key={error}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
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
