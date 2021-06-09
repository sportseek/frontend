import React from "react"

import {styled} from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const Dummy = styled('div')(() => ({
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    flex: 1,
    flexDirection: "column",
    height: "80vh",
    overflow: "hidden"
}))

const DummyPage = () => <Dummy>
        <Typography variant="h1">To be implemented in Future</Typography>
    </Dummy>

export default DummyPage