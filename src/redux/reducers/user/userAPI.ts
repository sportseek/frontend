import axios from "utils/axios"
import { IUser } from "types"

const userEndpoint = "user"

const fetchById = () => {
  const url = `/${userEndpoint}/`
  return axios.get(url).then((response) => response)
}

const update = (user: IUser) => {
  const url = `/${userEndpoint}/update/${user._id}`
  return axios.put(url, user).then((response) => response)
}

const updateArenaImage = (imagePayload: any) => {
  const url = `/${userEndpoint}/updateArenaImage/${imagePayload.userId}`
  return axios.put(url, imagePayload.formData).then((response) => response)
}

export default { fetchById, update, updateArenaImage }
