import React from "react"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

type Props = {
  open: boolean
  handleClose: () => void
  handleOKClick: () => void
}

const AddPersonalEventDialog = (props: Props) => {
  const { open, handleClose, handleOKClick } = props

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Event
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You can add your schedule when you are not available for any sport,
            so if your friends wants to invite you they will know that you are
            unavilable
          </Typography>
          <Typography gutterBottom>
            Click Ok to make the time slots editable, you can drag to select
            multiple time slots, after selecting slots you can create event
          </Typography>
          <Typography gutterBottom>
            You can go to month view, if you are unavilable for days and set the
            schedule there
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOKClick} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPersonalEventDialog
