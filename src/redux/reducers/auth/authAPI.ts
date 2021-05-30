import axios from "utils/axios"

const authEndpoint = "auth"

const signin = () => {
  const url = `/${authEndpoint}/signin/`
  return axios.get(url).then((response) => response)
}

const signup = () => {
    const url = `/${authEndpoint}/signup/`
    return axios.get(url).then((response) => response)
  }

export default { signup, signin }
