import axios from "utils/axios"
import { IUser } from "types"

const userEndpoint = "user"

const fetchById = () => {
  const url = `/${userEndpoint}/`
  return axios.get(url).then((response) => response)
}

const update = (user: IUser) => {
  const url = `/${userEndpoint}/update/`
  return axios.put(url, user).then((response) => response)
}

const updateProfilePic = (formData: any) => {
  const url = `/${userEndpoint}/updateProfilePic/`
  return axios.put(url, formData).then((response) => response)
}

const getNotifications = (pageNumber: number) => {
  const url = `/notification/getNotifications/${pageNumber}`
  return axios.get(url).then((response) => response)
}

const readNotification = (notificationId: string) => {
  const url = `/notification/readNotification`
  return axios.post(url, { notificationId }).then((response) => response)
}

export default {
  fetchById,
  update,
  updateProfilePic,
  getNotifications,
  readNotification,
}
