import axios, { AxiosRequestConfig } from "axios"

const host = process.env.BACKEND_URL

const instance = axios.create({
  baseURL: host,
})

function addAuthHeader(config: AxiosRequestConfig) {
  const token = window.localStorage.authToken
  config.headers.Authorization = `Bearer ${token}`
  return config
}

instance.interceptors.request.use(addAuthHeader)

export default instance
