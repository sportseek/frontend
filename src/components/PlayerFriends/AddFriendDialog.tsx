import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import { useAppDispatch } from "redux/hooks"
import Avatar from "@material-ui/core/Avatar"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CircularProgress from "@material-ui/core/CircularProgress"
import { addFriend } from "redux/reducers/user/userSlice"
import userAPI from "redux/reducers/user/userAPI"
import Typography from "@material-ui/core/Typography"

export interface FrdDetails {
  id: string
  name: string
  imageURL: string
  email: string
}

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}))

type Props = {
  open: boolean
  handleClose: () => void
}

export default function AddFriendDialog(props: Props) {
  const classes = useStyles()
  const { open: openDialog, handleClose } = props
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false)
  const [curOption, setCurOption] = React.useState<FrdDetails | null>(null)
  const [options, setOptions] = React.useState<FrdDetails[]>([])
  const loading = open && options.length === 0

  const handleSave = () => {
    if (curOption) {
      dispatch(addFriend(curOption.email))
    }
    handleClose()
  }

  const handleOptionSelect = (option: FrdDetails, value: FrdDetails) =>
    option.name === value.name

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: FrdDetails | null
  ) => {
    setCurOption(value)
  }

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const res = await userAPI.findAll()
      if (active) {
        setOptions(res)
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="add-friend-dialog-title"
    >
      <DialogTitle id="add-friend-dialog-title">Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a friend, please search by entering the name.
        </DialogContentText>
        <Autocomplete
          id="player-field"
          style={{ width: 400 }}
          open={open}
          autoHighlight
          color="primary"
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          classes={{
            option: classes.option,
          }}
          getOptionSelected={handleOptionSelect}
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <>
              <span>
                <Avatar src={option.imageURL} className={classes.avatar}>
                  {option.name[0]}
                </Avatar>
              </span>
              <Typography variant="caption">{option.name}</Typography>
            </>
          )}
          onChange={handleChange}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              color="primary"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="primary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Add
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
