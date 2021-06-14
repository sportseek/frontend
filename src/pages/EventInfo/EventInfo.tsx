import React, { useState, useEffect } from "react"
import { data } from "./dummydata"
import { Link, useParams } from "react-router-dom"
import MainFeaturedPost from "../../components/MainFeaturedPost/MainFeaturedPost"
import { Button, makeStyles } from "@material-ui/core"
import PaymentIcon from "@material-ui/icons/Payment"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import { useAppDispatch, useAppSelector } from "redux/hooks"
import {
  fetchEventById,
  selectCurrentEvent,
} from "redux/reducers/event/eventSlice"

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #52bfff, #6242ff)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "15px 50px",
  },
})

type Params = {
  id: string
}
function EventInfo() {
  const [title, setTitle] = useState("default title")
  const [sportType, setSportType] = useState("default sportType")
  const [image_url, setImageUrl] = useState("default url")
  const [registered, setRegistered] = useState(false)
  const [interested, setInterested] = useState(true)
  const { id } = useParams<Params>()

  const dispatch = useAppDispatch()
  const currentEvent = useAppSelector(selectCurrentEvent)

  const classes = useStyles()

  useEffect(() => {
    console.log(id)
    dispatch(fetchEventById(id))
  }, [])

  const mainFeaturedPost = {
    title: currentEvent.title,
    //description:  "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    //image: image_url,
    //imgText: "main image description",
    //linkText: "Continue reading…",
  }

  return (
    <div>
      <MainFeaturedPost post={mainFeaturedPost} />
      <h1>{currentEvent.title}</h1>
      <h2>{currentEvent.sportType}</h2>
      <Button
        startIcon={<PaymentIcon />}
        className={classes.root}
        component={Link}
        to="/payment"
      >
        Participate
      </Button>
      {interested ? (
        <Button
          startIcon={<ThumbDownIcon />}
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => setInterested(!interested)}
        >
          Not Interested
        </Button>
      ) : (
        <Button
          startIcon={<ThumbUpIcon />}
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => setInterested(!interested)}
        >
          Interested
        </Button>
      )}
    </div>
  )
}

export default EventInfo
