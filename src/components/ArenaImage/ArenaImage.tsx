import { Card, IconButton, makeStyles, Theme } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Edit from "@material-ui/icons/Edit"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  selectLoggedInUser,
  updateProfilePic,
} from "redux/reducers/user/userSlice"
import { IArenaOwner } from "types"

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
  cardContent: {
    paddingTop: 4,
    paddingLeft: 24,
    paddingBottom: 0,
    maxHeight: "70vh",
    overflowY: "scroll",
  },
  cardActions: {
    paddingTop: 0,
    paddingLeft: 24,
    paddingBottom: 4,
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
  },
  profileImage: {
    objectFit: "cover",
    maxWidth: "100%",
  },

  profileImgButton: {
    position: "absolute",
    top: "80%",
    left: "70%",
  },
}))

const ArenaImage = () => {
  const classes = useStyles()
  const defaultImage =
    "https://res.cloudinary.com/fshahriar008/image/upload/v1609701702/user_bccush.png"
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectLoggedInUser) as IArenaOwner
  const [imageUrl, setImageUrl] = useState(defaultImage)
  const hidden = true

  useEffect(() => {
    if (user.profileImageUrl) setImageUrl(user.profileImageUrl)
    else {
      setImageUrl(defaultImage)
    }
  }, [user.profileImageUrl])
  const handleImageChange = (event: any) => {
    const image = event.target.files[0]
    let src = URL.createObjectURL(event.target.files[0])
    let preview: any = document.getElementById("image-preview")
    preview.src = src
    setImageUrl(image)

    // api call
    const formData = new FormData()
    formData.append("image", image)
    dispatch(updateProfilePic(formData))
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput")
    fileInput?.click()
  }

  return (
    <div>
      <Card raised className={classes.card}>
        <div className={classes.imageWrapper}>
          <img
            src={imageUrl}
            id="image-preview"
            alt="profile"
            className={classes.profileImage}
          />
          <input
            type="file"
            id="imageInput"
            hidden={hidden}
            onChange={handleImageChange}
          />
          <IconButton color="primary" onClick={handleEditPicture}>
            <Edit />
          </IconButton>
        </div>
      </Card>
    </div>
  )
}

export default ArenaImage
