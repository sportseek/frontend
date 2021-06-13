import axios from "utils/axios"
import { ArenaSignupPayload } from "components/ArenaSignup/ArenaSignup"
import { UserSigninPayload } from "components/SigninForm/SigninForm"
import { PlayerSignupPayload } from "components/PlayerSignup/PlayerSignup"

const authEndpoint = "auth"

const signin = async (payload: UserSigninPayload) => {
  const url = `/${authEndpoint}/signin/`
  const response = await axios.post(url, payload)
  return response
}

const playerSignup = async (payload: PlayerSignupPayload) => {
  const url = `/${authEndpoint}/playerSignup/`
  const response = await axios.post(url, payload)
  return response
}

const arenaSignup = async (payload: ArenaSignupPayload) => {
  const url = `/${authEndpoint}/arenaSignup/`
  const response = await axios.post(url, payload)
  return response
}

export default { playerSignup, arenaSignup, signin }
