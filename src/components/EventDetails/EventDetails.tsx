import React from "react"

import { IEvent } from "types"

type EventDetailsProps = {
  event: IEvent
}

const EventDetails = (props: EventDetailsProps) => {
  const { event } = props

  const { title = "" } = event

  return <div>{title}</div>
}

export default EventDetails
