import axios from "utils/axios"
import { IUser } from "types"

const userEndpoint = "user"

const fetchById = () => {
  const url = `/${userEndpoint}/`
  return axios.get(url).then((response) => response)
}

const findAll = () => {
  const url = `/${userEndpoint}/findAll`
  return axios
    .get(url)
    .then((response) => response.data)
    .catch(() => [])
}

const findFriend = (friendId: string) => {
  const url = `/${userEndpoint}/findFriendById/${friendId}`
  return axios
    .get(url)
    .then((response) => response.data.friend)
    .catch(() => [])
}

const update = (user: IUser) => {
  const url = `/${userEndpoint}/update/`
  return axios.put(url, user).then((response) => response)
}

const updateProfilePic = (formData: any) => {
  const url = `/${userEndpoint}/updateProfilePic/`
  return axios.put(url, formData).then((response) => response)
}

const addFriend = (email: string) => {
  const url = `/${userEndpoint}/addFriend/`
  return axios.put(url, { email }).then((response) => response)
}

const removeFriend = (ids: string[]) => {
  const url = `/${userEndpoint}/removeFriends/`
  return axios.put(url, { ids }).then((response) => response)
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
  addFriend,
  fetchById,
  findAll,
  findFriend,
  removeFriend,
  update,
  updateProfilePic,
  getNotifications,
  readNotification,
}
