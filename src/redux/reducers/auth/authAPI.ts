import { PlayerSignupPayload } from './../../../components/PlayerSignup/PlayerSignup';
import axios from "utils/axios"
import { ArenaSignupPayload } from 'components/ArenaSignup/ArenaSignup';

const authEndpoint = "auth"

const signin = () => {
  const url = `/${authEndpoint}/signin/`
  return axios.get(url).then((response) => response)
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
