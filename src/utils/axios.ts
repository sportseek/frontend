import axios from "axios"

const host = process.env.BACKEND_URL
const token = window.localStorage.jwtToken

const axiosAPI = axios.create({
  baseURL: host,
})

export default axiosAPI
