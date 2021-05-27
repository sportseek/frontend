import React, { FC } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  simpleCard: {
    height: "100%",
    width: "100%",
  },
  cardValue: {
    fontWeight: 400,
    marginBottom: -7,
  },
})

type WalletProps = {
  value: string
}

const Wallet: FC<WalletProps> = (props: WalletProps) => {
  const classes = useStyles()
  const { value } = props
  const euro = "\u20AC"
  return (
    <Card>
      <CardHeader title="Wallet" />
      <CardContent>
        <Typography
          align="center"
          variant="h3"
          color="secondary"
          className={classes.cardValue}
        >
          {`${value} ${euro}`}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Wallet
