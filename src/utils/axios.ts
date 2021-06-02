import axios from "axios"

const host = process.env.BACKEND_URL_LOCAL
const token = window.localStorage.jwtToken

const axiosAPI = axios.create({
  baseURL: host,
  headers: {
    Authorization: `jwt ${token}`,
  },
})

export default axiosAPI
