import axios from "axios"

const host = process.env.BACKEND_URL

const instance = axios.create({
  baseURL: host,
})

export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const deleteToken = () => {
  delete axios.defaults.headers.common.Authorization
}

export default instance
