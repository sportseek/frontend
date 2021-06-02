import axios from "utils/axios"
import { ArenaSignupPayload } from "components/ArenaSignup/ArenaSignup"
import { UserSigninPayload } from "components/SigninForm/SigninForm"
import { PlayerSignupPayload } from "components/PlayerSignup/PlayerSignup"

const authEndpoint = "auth"

const signin = (payload: UserSigninPayload) => {
  const url = `/${authEndpoint}/signin/`
  return axios.post(url, payload).then((response) => response)
}

const playerSignup = (payload: PlayerSignupPayload) => {
  const url = `/${authEndpoint}/playerSignup/`
  return axios.post(url, payload).then((response) => response)
}

const arenaSignup = (payload: ArenaSignupPayload) => {
  const url = `/${authEndpoint}/arenaSignup/`
  return axios.post(url, payload).then((response) => response)
}

export default { playerSignup, arenaSignup, signin }
