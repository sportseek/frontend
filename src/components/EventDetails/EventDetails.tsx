import React from "react"

import {Event} from "types"

type EventDetailsProps = {
    event: Event
}

const EventDetails = (props: EventDetailsProps) => {
    
    const {event} = props
    
    const {title = "" } = event

    return <div>{title}</div>
}

export default EventDetails