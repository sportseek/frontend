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

const updateProfilePic = (imagePayload: any) => {
  const url = `/${userEndpoint}/updateProfilePic/`
  return axios.put(url, imagePayload.formData).then((response) => response)
}

export default { fetchById, update, updateProfilePic }
