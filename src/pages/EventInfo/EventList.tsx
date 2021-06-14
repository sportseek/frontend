import React, { useState } from "react"
import { Link } from "react-router-dom"
import { data } from "./dummydata"

function EventList() {
  const [events, setEvent] = useState(data)
  return (
    <div>
      <h1>List of Events</h1>
      {events.map((indEvent) => {
        return (
          <div key={indEvent.id}>
            <h2>{indEvent.title}</h2>
            <Link to={`/eventdetails/${indEvent.id}`}>View Details</Link>
          </div>
        )
      })}
    </div>
  )
}

export default EventList
