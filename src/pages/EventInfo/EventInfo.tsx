import React, { useState, useEffect } from "react"
import { data } from "./dummydata"
import { Link, useParams } from "react-router-dom"
import MainFeaturedPost from "../../components/MainFeaturedPost/MainFeaturedPost"
import { Button } from "@material-ui/core"
import PaymentIcon from "@material-ui/icons/Payment"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"

import { EventFullDetails } from "types/Event"
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

  useEffect(() => {
    const newEvent = data.find((indEvent) => indEvent.id === parseInt(id))
    if (newEvent) {
      setTitle(newEvent.title)
      setSportType(newEvent.sportType)
      setImageUrl(newEvent.image_url)
    }
  }, [])

  const mainFeaturedPost = {
    title: title,
    //description:  "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: image_url,
    //imgText: "main image description",
    //linkText: "Continue reading…",
  }

  return (
    <div>
      <MainFeaturedPost post={mainFeaturedPost} />
      <h1>{title}</h1>
      <h2>{sportType}</h2>
      <Button
        startIcon={<PaymentIcon />}
        size="large"
        variant="contained"
        color="primary"
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
